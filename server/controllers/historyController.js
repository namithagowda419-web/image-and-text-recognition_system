import { db } from '../storage/inMemoryDb.js';

export const getHistory = async (req, res) => {
  try {
    const { type, search } = req.query;
    let list = [...db.history];

    if (type && type !== 'all') {
      list = list.filter(item => item.type === type);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.extractedText.toLowerCase().includes(q)
      );
    }

    res.json({ history: list, total: list.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
};

export const addHistory = async (req, res) => {
  try {
    const { type, title, imageUrl, summary, detectedObjects, extractedText, processingTimeMs } = req.body;

    const newRecord = {
      id: `hist_${Date.now()}`,
      userId: 'usr_demo_1',
      type: type || 'object_detection',
      title: title || (type === 'ocr' ? 'OCR Extraction' : 'Object Detection Run'),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      summary: summary || 'Completed recognition task',
      detectedObjects: detectedObjects || [],
      extractedText: extractedText || '',
      processingTimeMs: processingTimeMs || Math.floor(Math.random() * 300) + 200,
      status: 'Completed',
      createdAt: new Date().toISOString()
    };

    db.history.unshift(newRecord);
    res.status(201).json({ message: 'History record created', record: newRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error saving history record' });
  }
};

export const deleteHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    db.history = db.history.filter(item => item.id !== id);
    res.json({ message: 'History record deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting history item' });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalRuns = db.history.length;
    const ocrRuns = db.history.filter(h => h.type === 'ocr').length;
    const objectRuns = db.history.filter(h => h.type === 'object_detection').length;

    res.json({
      stats: {
        totalImagesProcessed: 14850 + totalRuns,
        ocrRequests: 9240 + ocrRuns,
        objectsDetected: 34210 + (objectRuns * 4),
        accuracyPercentage: 99.4,
        avgLatencyMs: 385,
        storageSavedMb: 142.8
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

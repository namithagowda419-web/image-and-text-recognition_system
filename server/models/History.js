import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['object_detection', 'ocr'], required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  summary: { type: String, default: '' },
  detectedObjects: [
    {
      label: String,
      confidence: Number,
      bbox: [Number]
    }
  ],
  extractedText: { type: String, default: '' },
  processingTimeMs: { type: Number, default: 0 },
  status: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.History || mongoose.model('History', historySchema);

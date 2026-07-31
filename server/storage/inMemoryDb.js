// In-memory data store providing seamless local fallback if MongoDB is not connected

class InMemoryStore {
  constructor() {
    this.users = [
      {
        id: 'usr_demo_1',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        bio: 'AI enthusiast & Lead Designer',
        apiKey: 'sk_live_lumina_9823471928374912',
        createdAt: new Date().toISOString()
      }
    ];

    this.history = [
      {
        id: 'hist_101',
        userId: 'usr_demo_1',
        type: 'object_detection',
        title: 'Office Desk Setup Recognition',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        summary: 'Detected 4 objects: Laptop (98%), Coffee Cup (94%), Keyboard (91%), Mouse (89%)',
        detectedObjects: [
          { label: 'Laptop', confidence: 0.98, bbox: [120, 80, 400, 300] },
          { label: 'Coffee Cup', confidence: 0.94, bbox: [50, 220, 100, 120] },
          { label: 'Keyboard', confidence: 0.91, bbox: [180, 350, 350, 100] },
          { label: 'Mouse', confidence: 0.89, bbox: [560, 360, 80, 90] }
        ],
        extractedText: '',
        processingTimeMs: 342,
        status: 'Completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: 'hist_102',
        userId: 'usr_demo_1',
        type: 'ocr',
        title: 'Invoice Text Extraction',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        summary: 'Extracted 148 words with 99.1% OCR confidence',
        detectedObjects: [],
        extractedText: "INVOICE #INV-2026-894\nDate: July 31, 2026\nBill To: Lumina Tech Solutions\nItem: AI Recognition API Subscription - Pro Plan ($49.00)\nSubtotal: $49.00\nTax: $4.41\nTotal: $53.41\nPayment Status: PAID",
        processingTimeMs: 418,
        status: 'Completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: 'hist_103',
        userId: 'usr_demo_1',
        type: 'object_detection',
        title: 'Urban Street Vehicle & Pedestrian Detection',
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
        summary: 'Detected 3 objects: Car (96%), Person (92%), Traffic Light (88%)',
        detectedObjects: [
          { label: 'Car', confidence: 0.96, bbox: [200, 180, 300, 200] },
          { label: 'Person', confidence: 0.92, bbox: [100, 200, 60, 140] },
          { label: 'Traffic Light', confidence: 0.88, bbox: [450, 50, 40, 90] }
        ],
        extractedText: '',
        processingTimeMs: 290,
        status: 'Completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
      }
    ];

    this.contacts = [];
  }
}

export const db = new InMemoryStore();

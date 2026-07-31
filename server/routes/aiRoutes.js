import express from 'express';
import { processImageObjectDetection, processOcrExtraction, submitContactForm } from '../controllers/aiController.js';

const router = express.Router();

router.post('/detect-objects', processImageObjectDetection);
router.post('/extract-ocr', processOcrExtraction);
router.post('/contact', submitContactForm);

export default router;

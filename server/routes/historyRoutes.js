import express from 'express';
import { getHistory, addHistory, deleteHistoryItem, getStats } from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getHistory);
router.post('/', addHistory);
router.delete('/:id', deleteHistoryItem);
router.get('/stats', getStats);

export default router;

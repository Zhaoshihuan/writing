import express from 'express';
import { EssayController } from './essays.controller.js';

const router = express.Router();

router.get('/featured', EssayController.getFeaturedEssays);
router.get('/search', EssayController.searchEssays);
router.get('/', EssayController.getAllEssays);
router.get('/:id', EssayController.getEssayById);

export default router;

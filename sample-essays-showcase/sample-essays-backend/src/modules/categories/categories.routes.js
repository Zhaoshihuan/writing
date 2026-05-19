import express from 'express';
import { CategoryController } from './categories.controller.js';

const router = express.Router();

router.get('/', CategoryController.getCategories);
router.get('/stats', CategoryController.getCategoryStats);

export default router;

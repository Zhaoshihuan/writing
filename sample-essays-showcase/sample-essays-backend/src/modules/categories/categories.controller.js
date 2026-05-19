import { CategoryService } from './categories.service.js';

export class CategoryController {
  static getCategories(req, res, next) {
    try {
      const categories = CategoryService.getAll();
      res.json({
        status: 'success',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static getCategoryStats(req, res, next) {
    try {
      const stats = CategoryService.getCategoryStats();
      res.json({
        status: 'success',
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

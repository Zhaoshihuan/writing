import { EssayService } from './essays.service.js';

export class EssayController {
  static getAllEssays(req, res, next) {
    try {
      const { category, search, sort } = req.query;
      const essays = EssayService.getAll({ category, search, sort });
      res.json({
        status: 'success',
        data: essays,
        count: essays.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static getEssayById(req, res, next) {
    try {
      const { id } = req.params;
      const essay = EssayService.getById(id);
      res.json({
        status: 'success',
        data: essay,
      });
    } catch (error) {
      next(error);
    }
  }

  static getFeaturedEssays(req, res, next) {
    try {
      const essays = EssayService.getFeatured();
      res.json({
        status: 'success',
        data: essays,
      });
    } catch (error) {
      next(error);
    }
  }

  static searchEssays(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          status: 'error',
          message: 'Search query is required',
        });
      }
      const essays = EssayService.search(q);
      res.json({
        status: 'success',
        data: essays,
        count: essays.length,
      });
    } catch (error) {
      next(error);
    }
  }
}

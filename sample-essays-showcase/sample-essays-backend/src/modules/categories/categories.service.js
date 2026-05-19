// Mock categories - in production, this would connect to a real DB
import { essays } from '../../data/essays.js';

export class CategoryService {
  static getAll() {
    // Extract unique categories from essays
    const categories = new Set(essays.map(e => e.category));
    return Array.from(categories).sort();
  }

  static getCategoryStats() {
    const stats = {};
    essays.forEach(essay => {
      if (!stats[essay.category]) {
        stats[essay.category] = 0;
      }
      stats[essay.category]++;
    });
    return stats;
  }
}

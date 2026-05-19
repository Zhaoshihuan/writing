// Mock database - in production, this would connect to a real DB
import { essays } from '../../data/essays.js';

export class EssayService {
  // Get all essays with optional filtering
  static getAll({ category, search, sort = 'newest' } = {}) {
    let filtered = [...essays];

    if (category && category !== 'all') {
      filtered = filtered.filter(e => e.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.author.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sort === 'oldest') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      // newest (default)
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }

  // Get single essay by ID
  static getById(id) {
    const essay = essays.find(e => e.id === parseInt(id));
    if (!essay) {
      const error = new Error('Essay not found');
      error.status = 404;
      throw error;
    }
    // Increment views
    essay.views = (essay.views || 0) + 1;
    return essay;
  }

  // Get featured essays
  static getFeatured() {
    return essays.filter(e => e.featured).slice(0, 3);
  }

  // Search essays
  static search(query) {
    return this.getAll({ search: query });
  }
}

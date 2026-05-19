const API_URL = 'http://localhost:5001/api';

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Home page: Load featured essays
async function loadFeaturedEssays() {
  try {
    const response = await fetch(`${API_URL}/essays/featured`);
    const data = await response.json();
    
    const container = document.getElementById('featured-container');
    if (!container) return;
    
    container.innerHTML = data.data.map(essay => `
      <a href="essay.html?id=${essay.id}" class="essay-card group">
        <div class="mb-4 flex items-start justify-between">
          <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
            ${essay.category}
          </span>
          <span class="text-xs text-gray-500">${essay.readTime}</span>
        </div>
        <h3 class="text-xl font-bold mb-2 group-hover:text-indigo-600 transition">
          ${essay.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
          ${essay.description}
        </p>
        <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <span>${essay.author}</span>
          <span>👁 ${essay.views}</span>
        </div>
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading featured essays:', error);
  }
}

// Load categories
async function loadCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    
    // Update stats
    const categoryCount = document.getElementById('category-count');
    if (categoryCount) {
      categoryCount.textContent = data.data.length;
    }

    // Render category cards
    const container = document.getElementById('categories-container');
    if (container) {
      container.innerHTML = data.data.map(category => `
        <a href="browse.html?category=${encodeURIComponent(category)}" 
           class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition">
          <h3 class="font-semibold text-gray-900">${category}</h3>
          <p class="text-sm text-gray-500">Browse essays</p>
        </a>
      `).join('');
    }

    // Update footer categories
    const footerCats = document.getElementById('footer-categories');
    if (footerCats) {
      footerCats.innerHTML = data.data.slice(0, 4).map(cat => `
        <li><a href="browse.html?category=${encodeURIComponent(cat)}" class="hover:text-white transition">${cat}</a></li>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

// Get essay count
async function loadEssayCount() {
  try {
    const response = await fetch(`${API_URL}/essays`);
    const data = await response.json();
    
    const countEl = document.getElementById('essay-count');
    if (countEl) {
      countEl.textContent = data.count || 0;
    }
  } catch (error) {
    console.error('Error loading essay count:', error);
  }
}

// Browse page: Load essays with filters
async function loadEssays() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const container = document.getElementById('essays-container');
  const loadingState = document.getElementById('loading-state');
  const noResults = document.getElementById('no-results');

  if (!container) return;

  const search = searchInput?.value || '';
  const category = categoryFilter?.value || 'all';
  const sort = sortFilter?.value || 'newest';

  try {
    let url = `${API_URL}/essays?sort=${sort}`;
    if (category !== 'all') url += `&category=${category}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const response = await fetch(url);
    const data = await response.json();

    loadingState.classList.add('hidden');

    if (data.data.length === 0) {
      container.innerHTML = '';
      noResults.classList.remove('hidden');
      return;
    }

    noResults.classList.add('hidden');
    container.innerHTML = data.data.map(essay => `
      <a href="essay.html?id=${essay.id}" class="essay-card group">
        <div class="mb-4 flex items-start justify-between">
          <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
            ${essay.category}
          </span>
          <span class="text-xs text-gray-500">${essay.readTime}</span>
        </div>
        <h3 class="text-lg font-bold mb-2 group-hover:text-indigo-600 transition line-clamp-2">
          ${essay.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
          ${essay.description}
        </p>
        <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <span>${essay.author}</span>
          <span>👁 ${essay.views}</span>
        </div>
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading essays:', error);
    container.innerHTML = '<p class="text-red-500">Error loading essays</p>';
  }
}

// Load categories for filter
async function loadCategoriesForFilter() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    
    const filter = document.getElementById('category-filter');
    if (!filter) return;

    const currentValue = filter.value;
    filter.innerHTML = '<option value="all">All Categories</option>';
    
    data.data.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      filter.appendChild(option);
    });

    filter.value = currentValue;
  } catch (error) {
    console.error('Error loading categories for filter:', error);
  }
}

// Essay detail page
async function loadEssayDetail() {
  const params = new URLSearchParams(window.location.search);
  const essayId = params.get('id');

  if (!essayId) {
    window.location.href = 'browse.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/essays/${essayId}`);
    const data = await response.json();
    const essay = data.data;

    // Set page title
    document.title = `${essay.title} - Sample Essays Showcase`;

    // Populate essay details
    document.getElementById('essay-title').textContent = essay.title;
    document.getElementById('essay-author').textContent = essay.author;
    document.getElementById('essay-category').textContent = essay.category;
    document.getElementById('essay-date').textContent = formatDate(essay.date);
    document.getElementById('essay-read-time').textContent = `⏱ ${essay.readTime}`;
    document.getElementById('essay-views').textContent = essay.views;

    // Format and display content
    const content = essay.content
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => {
        // Check if it's a bold heading (starts with **)
        if (p.startsWith('**') && p.endsWith('**')) {
          return `<h3 class="text-xl font-bold mt-6 mb-4 text-gray-900">${p.replace(/\*\*/g, '')}</h3>`;
        }
        return `<p class="text-gray-700 leading-relaxed mb-4">${p}</p>`;
      })
      .join('');

    document.getElementById('essay-content').innerHTML = content;

    // Load related essays
    loadRelatedEssays(essay.category, essayId);
  } catch (error) {
    console.error('Error loading essay detail:', error);
    document.getElementById('essay-content').innerHTML = 
      '<p class="text-red-500">Error loading essay</p>';
  }
}

// Load related essays
async function loadRelatedEssays(category, currentId) {
  try {
    const response = await fetch(`${API_URL}/essays?category=${encodeURIComponent(category)}`);
    const data = await response.json();
    
    const related = data.data
      .filter(e => e.id !== parseInt(currentId))
      .slice(0, 3);

    const container = document.getElementById('related-essays');
    if (container) {
      container.innerHTML = related.map(essay => `
        <a href="essay.html?id=${essay.id}" class="essay-card group">
          <div class="mb-4 flex items-start justify-between">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
              ${essay.category}
            </span>
          </div>
          <h3 class="text-lg font-bold mb-2 group-hover:text-indigo-600 transition line-clamp-2">
            ${essay.title}
          </h3>
          <p class="text-sm text-gray-500">${essay.author}</p>
        </a>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading related essays:', error);
  }
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');

  if (page === 'home') {
    loadFeaturedEssays();
    loadCategories();
    loadEssayCount();
  }

  // Add event listeners for browse page
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (searchInput) searchInput.addEventListener('input', loadEssays);
  if (categoryFilter) categoryFilter.addEventListener('change', loadEssays);
  if (sortFilter) sortFilter.addEventListener('change', loadEssays);

  // Handle URL parameters for browse page
  if (page === 'browse') {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category && categoryFilter) {
      categoryFilter.value = category;
      loadEssays();
    }
  }
});

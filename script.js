/* ========================================
   SAMPLE DATA
   ======================================== */
const phones = [
  { id: 1, name: 'Samsung Galaxy A14', emoji: '📱', priceMin: 250000, priceMax: 320000 },
  { id: 2, name: 'iPhone 11', emoji: '📱', priceMin: 750000, priceMax: 850000 },
  { id: 3, name: 'Tecno Spark 10', emoji: '📱', priceMin: 300000, priceMax: 350000 },
  { id: 4, name: 'Samsung Galaxy S23', emoji: '📱', priceMin: 1200000, priceMax: 1500000 },
  { id: 5, name: 'Redmi Note 12', emoji: '📱', priceMin: 450000, priceMax: 550000 },
  { id: 6, name: 'POCO X5', emoji: '📱', priceMin: 500000, priceMax: 650000 },
];

const articles = [
  {
    id: 1,
    title: 'Samsung Galaxy A14 Review',
    description: 'Detailed review of the Samsung Galaxy A14 including specs, performance, camera quality, and value for money in Tanzania.',
    emoji: '📱'
  },
  {
    id: 2,
    title: 'Best Phones Under 500K',
    description: 'Comprehensive guide to the best smartphones available in Tanzania under 500,000 Tanzanian Shillings.',
    emoji: '💰'
  },
  {
    id: 3,
    title: 'Original vs Fake Phone Guide',
    description: 'Learn how to identify original phones from counterfeits. Important tips and tricks for safe phone purchasing in Tanzania.',
    emoji: '✅'
  },
  {
    id: 4,
    title: 'iPhone 11 Price in Tanzania',
    description: 'Current pricing, availability, and comparison of iPhone 11 across different retailers in Tanzania.',
    emoji: '🔍'
  },
];

/* ========================================
   INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  initializeNavigation();
  initializeHamburgerMenu();
  renderTrendingPhones();
  renderArticles();
  populatePhoneSelects();
  initializeSearch();
  initializeComparison();
});

/* ========================================
   NAVIGATION FUNCTIONS
   ======================================== */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }

    link.addEventListener('click', function (e) {
      // Remove active from all links
      navLinks.forEach(item => item.classList.remove('active'));
      // Add active to clicked link
      link.classList.add('active');
      // Close mobile menu if open
      closeNavMenu();
    });
  });
}

/* ========================================
   HAMBURGER MENU FUNCTIONS
   ======================================== */
function initializeHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    const header = document.querySelector('.header');
    if (!header.contains(e.target)) {
      closeNavMenu();
    }
  });
}

function closeNavMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.remove('active');
}

/* ========================================
   TRENDING PHONES SECTION
   ======================================== */
function renderTrendingPhones() {
  const container = document.getElementById('trendingPhones');
  container.innerHTML = '';

  phones.forEach(phone => {
    const card = createPhoneCard(phone);
    container.appendChild(card);
  });
}

function createPhoneCard(phone) {
  const card = document.createElement('div');
  card.className = 'phone-card';
  card.innerHTML = `
    <div class="phone-card-image">${phone.emoji}</div>
    <div class="phone-card-content">
      <h3 class="phone-card-name">${phone.name}</h3>
      <p class="phone-card-price">
        <span class="phone-card-price-range">Tsh ${phone.priceMin.toLocaleString()} – ${phone.priceMax.toLocaleString()}</span>
      </p>
    </div>
  `;
  card.addEventListener('click', () => {
    // Navigate to phone detail page (you can create this later)
    console.log('Clicked on:', phone.name);
  });
  return card;
}

/* ========================================
   ARTICLES SECTION
   ======================================== */
function renderArticles() {
  const container = document.getElementById('latestArticles');
  container.innerHTML = '';

  articles.forEach(article => {
    const card = createArticleCard(article);
    container.appendChild(card);
  });
}

function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.innerHTML = `
    <div class="article-image">${article.emoji}</div>
    <div class="article-content">
      <h3 class="article-title">${article.title}</h3>
      <p class="article-description">${article.description}</p>
      <a href="#" class="article-cta">View full review and price →</a>
    </div>
  `;
  card.addEventListener('click', (e) => {
    e.preventDefault();
    // Navigate to article page (you can create this later)
    console.log('Clicked on article:', article.title);
  });
  return card;
}

/* ========================================
   PHONE COMPARISON SECTION
   ======================================== */
function populatePhoneSelects() {
  const select1 = document.getElementById('phone1Select');
  const select2 = document.getElementById('phone2Select');

  phones.forEach(phone => {
    const option1 = document.createElement('option');
    option1.value = phone.id;
    option1.textContent = phone.name;
    select1.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = phone.id;
    option2.textContent = phone.name;
    select2.appendChild(option2);
  });
}

function initializeComparison() {
  const compareBtn = document.getElementById('compareBtn');
  const phone1Select = document.getElementById('phone1Select');
  const phone2Select = document.getElementById('phone2Select');

  compareBtn.addEventListener('click', () => {
    const phone1Id = phone1Select.value;
    const phone2Id = phone2Select.value;

    if (!phone1Id || !phone2Id) {
      alert('Please select both phones to compare');
      return;
    }

    if (phone1Id === phone2Id) {
      alert('Please select different phones to compare');
      return;
    }

    // Navigate to comparison page
    window.location.href = `compare.html?phone1=${phone1Id}&phone2=${phone2Id}`;
  });
}

/* ========================================
   SEARCH FUNCTIONALITY
   ======================================== */
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
}

function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    alert('Please enter a search term');
    return;
  }

  // Filter phones based on search
  const results = phones.filter(phone => 
    phone.name.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    alert('No phones found matching: ' + query);
    return;
  }

  // Display search results (you can create a results page later)
  console.log('Search results:', results);
}

/* ========================================
   CATEGORY BUTTONS FUNCTIONALITY
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const buttonText = btn.textContent.trim();
      console.log('Category clicked:', buttonText);
      // Navigate to category page (you can create this later)
      // window.location.href = `phones.html?category=${encodeURIComponent(buttonText)}`;
    });
  });
});

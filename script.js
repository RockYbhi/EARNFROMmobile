// Theme Toggle (Light/Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '🌞' : '🌙';
}
loadTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌙';
  });
}

// Modal Popup for menu links + Ask button
const modal = document.getElementById('menu-modal');
const closeModalBtn = document.querySelector('.close-modal');
const menuLinks = document.querySelectorAll('.menu-link');
const askBtn = document.getElementById('ask-btn');

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.getElementById('modal-title').textContent = "Feature Coming Soon!";
      document.getElementById('modal-msg').textContent = "यह विकल्प जल्द ही उपलब्ध होगा या आप इसकी detail पेज पर पहुँच चुके हैं।";
      document.getElementById('modal-extra').innerHTML = "";
      modal.style.display = 'flex';
    }
  });
});
if (closeModalBtn) {
  closeModalBtn.onclick = () => modal.style.display = 'none';
}
window.onclick = function(event) {
  if (event.target == modal) { modal.style.display = "none"; }
}
if (askBtn) {
  askBtn.onclick = () => {
    document.getElementById('modal-title').textContent = "Ask a Question";
    document.getElementById('modal-msg').textContent = "अपना सवाल पूछें, हमारी टीम जल्दी जवाब देगी!";
    document.getElementById('modal-extra').innerHTML = `
      <form id="ask-form">
        <input type="text" placeholder="आपका नाम" required style="margin-bottom:7px;width:90%">
        <input type="email" placeholder="ईमेल" required style="margin-bottom:7px;width:90%">
        <textarea rows="3" placeholder="सवाल लिखें..." required style="margin-bottom:7px;width:90%"></textarea>
        <button type="submit" class="btn small primary">Send</button>
      </form>
      <div id="ask-msg"></div>
    `;
    modal.style.display = 'flex';
    setTimeout(() => {
      const askForm = document.getElementById('ask-form');
      if (askForm) {
        askForm.onsubmit = function(e) {
          e.preventDefault();
          document.getElementById('ask-msg').textContent = "सवाल भेज दिया गया है!";
          askForm.reset();
        }
      }
    }, 100);
  };
}

// Back to Top Button
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});
if (topBtn) {
  topBtn.onclick = () => {
    window.scrollTo({top:0, behavior:'smooth'});
  };
}

// Newsletter subscribe
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('newsletter-msg').textContent = "Thank you for subscribing!";
    newsletterForm.reset();
  });
}

// Recent Posts: Demo auto-load
const allPosts = [
  {
    title: "सरकार की नई डिजिटल योजना",
    desc: "सरकार ने ग्रामीण युवाओं के लिए नई डिजिटल योजना की शुरुआत की है।",
    link: "#news"
  },
  {
    title: "YouTube से कमाई के नए तरीके",
    desc: "2025 में YouTube से कमाई के आसान और भरोसेमंद टिप्स।",
    link: "#youtube"
  },
  {
    title: "Mudra Loan: रियल अनुभव",
    desc: "Mudra Loan के लिए आवेदन कैसे करें और किन बातों का ध्यान रखें।",
    link: "#schemes"
  },
  {
    title: "Skill India: फ्री कोर्स",
    desc: "Skill India Mission के फ्री कोर्स और ऑनलाइन आवेदन प्रक्रिया।",
    link: "#schemes"
  }
];
const recentPostsDiv = document.getElementById('recent-posts');
function renderPosts(posts) {
  if (recentPostsDiv) {
    recentPostsDiv.innerHTML = posts.map(post =>
      `<div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.desc}</p>
        <a href="${post.link}" class="btn small menu-link">Read More</a>
      </div>`
    ).join('');
  }
}
renderPosts(allPosts);

// Search functionality (simple client-side demo)
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
if (searchForm && searchInput) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    if (!query) {
      renderPosts(allPosts);
      return;
    }
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.desc.toLowerCase().includes(query)
    );
    renderPosts(filtered.length ? filtered : [{
      title: "No Results",
      desc: "कोई पोस्ट नहीं मिला।",
      link: "#"
    }]);
  });
}

// Smooth scroll for anchor links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
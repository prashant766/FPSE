/* ============================================
   FASE - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    filterCourses();
    initLanguageSwitcher();
});

/* ============================================
   LANGUAGE SWITCHER
   ============================================ */

function initLanguageSwitcher() {
    const langSwitch = document.querySelector('.lang-switch');
    
    if (langSwitch) {
        const saved = localStorage.getItem('language') || 'en';
        switchLanguage(saved);
        langSwitch.value = saved;
        
        langSwitch.addEventListener('change', function(e) {
            switchLanguage(e.target.value);
        });
    }
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileMenuToggle) return;

    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                e.preventDefault();
                toggleDropdown(this.parentElement);
            } else {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
}

/* ============================================
   DROPDOWNS
   ============================================ */

function initDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toggleDropdown(item);
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

function toggleDropdown(element) {
    const parent = element.parentElement;
    const siblings = parent.querySelectorAll('.nav-item.dropdown');
    
    siblings.forEach(sibling => {
        if (sibling !== element) {
            sibling.classList.remove('active');
        }
    });

    element.classList.toggle('active');
}

/* ============================================
   COURSE FILTERING
   ============================================ */

function filterCourses() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseType = urlParams.get('type');

    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    const courseCards = coursesGrid.querySelectorAll('.course-card');

    if (courseType) {
        courseCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            card.style.display = cardType === courseType ? 'block' : 'none';
        });
    } else {
        courseCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

/* ============================================
   RESPONSIVE RESET
   ============================================ */

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (navMenu && mobileMenuToggle) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

/* ============================================
   FEEDBACK SYSTEM (FINAL FIXED VERSION)
   ============================================ */

// SAVE FEEDBACK
document.getElementById("feedbackForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // FIFO (max 5)
    if (reviews.length >= 8) {
        reviews.shift();
    }

    reviews.push({ name, feedback });

    localStorage.setItem("reviews", JSON.stringify(reviews));

alert("Feedback submitted successfully!");
this.reset();});

// DISPLAY REVIEWS
function loadReviews() {
    const container = document.getElementById("reviewsContainer");
    if (!container) return;

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    container.innerHTML = "";

    reviews.forEach(r => {

        if (!r.name || !r.feedback) return;

        container.innerHTML += `
            <div class="gallery-item">
                <img src="profile_icon.png">

                <div style="padding:15px;">
                    <h3>${r.name}</h3>
                    <p style="color:#2a8c7d; font-weight:600;">Student</p>
                    <p>"${r.feedback}"</p>
                </div>
            </div>
        `;
    });
}

window.addEventListener("load", loadReviews);
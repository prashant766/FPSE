/* ============================================
   FASE - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    filterCourses();
    initLanguageSwitcher();

    // 🔥 ADD THIS (SAFE INIT)
    initFeedbackForm();
    initStarRating();
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
   ⭐ STAR RATING SYSTEM (SAFE)
   ============================================ */

function initStarRating() {
    const stars = document.querySelectorAll("#starRating span");
    const ratingInput = document.getElementById("rating");

    if (!stars.length || !ratingInput) return;

    stars.forEach((star) => {
        star.addEventListener("click", () => {
            const selectedRating = star.getAttribute("data-value");
            ratingInput.value = selectedRating;

            stars.forEach(s => s.classList.remove("active"));

            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("active");
            }
        });
    });
}

/* ============================================
   🔥 FEEDBACK FORM SUBMIT (YOUR FEATURE)
   ============================================ */

function initFeedbackForm() {
    const form = document.getElementById("feedbackForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const course = document.getElementById("course").value;
        const feedback = document.getElementById("feedback").value;
        const rating = document.getElementById("rating").value;

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        reviews.push({ name, course, feedback, rating });

        localStorage.setItem("reviews", JSON.stringify(reviews));

        alert("Feedback submitted successfully!");

        this.reset();

        // reset stars
        document.querySelectorAll("#starRating span").forEach(s => s.classList.remove("active"));
    });
}



const slides = document.querySelectorAll(".hero-bg");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");

    index = (index + 1) % slides.length;

    slides[index].classList.add("active");
}, 5000);
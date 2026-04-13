/* ============================================
   FASE - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    filterCourses();
    initLanguageSwitcher();
    initFeedbackForm();
    initStarRating();

    // 🔥 HERO SLIDER (SAFE)
    initHeroSlider();

    // 🔥 DIRECTORY SLIDER (FIXED)
    initDirectorySlider();
});

/* ============================================
   HERO SLIDER (FIXED)
   ============================================ */

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-bg");
    if (!slides.length) return;

    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 5000);
}

/* ============================================
   DIRECTORY SLIDER (FIXED)
   ============================================ */

function initDirectorySlider() {
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const prev = document.querySelector(".slider-btn.prev");
    const next = document.querySelector(".slider-btn.next");

    if (!track || slides.length === 0) return;

    let i = 0;

    function update() {
        track.style.transform = `translateX(-${i * 100}%)`;
    }

    // Ensure first image visible
    update();

    if (next) {
        next.addEventListener("click", () => {
            i = (i + 1) % slides.length;
            update();
        });
    }

    if (prev) {
        prev.addEventListener("click", () => {
            i = (i - 1 + slides.length) % slides.length;
            update();
        });
    }

    setInterval(() => {
        i = (i + 1) % slides.length;
        update();
    }, 5000);
}

/* ============================================
   REST OF YOUR CODE (UNCHANGED)
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

function filterCourses() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseType = urlParams.get('type');

    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    const courseCards = coursesGrid.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        if (!courseType || card.getAttribute('data-type') === courseType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

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

        document.querySelectorAll("#starRating span").forEach(s => s.classList.remove("active"));
    });
}




/* responcive */


const menuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".menu-overlay");

// open menu
menuToggle.addEventListener("click", () => {
    navMenu.classList.add("active");
    overlay.classList.add("active");
});

// close when clicking overlay
overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
});




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
}
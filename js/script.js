document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('year').textContent = new Date().getFullYear();

    const typewriterElement = document.getElementById('typewriter');
    const textToType = "Étudiant Pré-MSc Epitech | En transition vers la Cybersécurité";
    let index = 0;
    function type() {
        if (index < textToType.length) {
            typewriterElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, 60);
        }
    }
    type();

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        }
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('nav-link-active');
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');
    const notification = document.getElementById('notification-popup');

    if (form) {
        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let jsonResponse = await response.json();
                    if (response.status == 200) {

                        notification.classList.remove('hidden', 'translate-x-full');
                        notification.classList.add('translate-x-0');
                        form.reset();

                        setTimeout(() => {
                            notification.classList.remove('translate-x-0');
                            notification.classList.add('translate-x-full');

                            setTimeout(() => notification.classList.add('hidden'), 500);
                        }, 5000);

                    } else {
                        console.log(response);
                        alert("Une erreur s'est produite. Veuillez réessayer.");
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert("Une erreur s'est produite. Veuillez réessayer.");
                });
        });
    }

});
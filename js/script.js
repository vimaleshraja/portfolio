// Set dark mode as default on page load
window.addEventListener('load', function() {
    document.body.setAttribute('data-bs-theme', 'dark');
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    if (body.getAttribute('data-bs-theme') === 'dark') {
        body.removeAttribute('data-bs-theme');
    } else {
        body.setAttribute('data-bs-theme', 'dark');
    }
});

const sections = Array.from(document.querySelectorAll('section[id]'));
const links = document.querySelectorAll('.sidebar a');

function updateActiveSection() {
    const scrollPosition = window.scrollY + 100;
    let activeId = sections[0].id;

    sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
            activeId = section.id;
        }
    });

    links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

links.forEach((link) => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // set clicked link active immediately
            links.forEach((other) => other.classList.remove('active'));
            this.classList.add('active');

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(updateActiveSection, 500);
        }
    });
});

const hamburgerButton = document.getElementById('hamburger-button');
const menu = document.getElementById('menu');

hamburgerButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

function animateCount(element, target, duration, decimalPlaces = 0) {
    let start = 0;
    let end = parseFloat(target);
    let increment = end / (duration / 16);
    let decimalFactor = Math.pow(10, decimalPlaces);

    function updateCount() {
        start += increment;
        if (start >= end) {
            element.innerText = end.toFixed(decimalPlaces);
        } else {
            element.innerText = (Math.round(start * decimalFactor) / decimalFactor).toFixed(decimalPlaces);
            requestAnimationFrame(updateCount);
        }
    }

    updateCount();
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const span = entry.target;
            let countTo = span.getAttribute('countTo');
            let decimalPlaces = span.getAttribute('data-decimal') ? parseInt(span.getAttribute('data-decimal')) : 0;
            animateCount(span, countTo, 2000, decimalPlaces);
            observer.unobserve(span);
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 
});

document.querySelectorAll('[id^="countto"]').forEach(span => {
    observer.observe(span);
});
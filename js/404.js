// Redirecció automàtica amb compte enrere
let seconds = 10;
const countdownEl = document.getElementById('countdown');
const timer = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
        clearInterval(timer);
        window.location.href = '/';
    }
}, 1000);

// Cercador
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
    }
});

// Cancel·la la redirecció si l'usuari fa clic
document.addEventListener('click', () => {
    clearInterval(timer);
    document.querySelector('.redirect').style.display = 'none';
}, { once: true });   
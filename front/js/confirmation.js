window.addEventListener('load', initApp);

function initApp() {
    document.getElementById('orderId').textContent = location.href.split('?')[1].split('&')[0].split('=')[1];
}
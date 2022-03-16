window.addEventListener('load', initApp);

function initApp() {
    location.href.split('?')[1].split('&').forEach(elem => {
        console.log(elem.split('='));
    })
    const ordrId = document.getElementById('orderId');
    ordrId.textContent = Math.floor(Math.random() * 100000)
}
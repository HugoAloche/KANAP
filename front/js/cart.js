import {} from './data.js';
/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);

function initApp() {
    const section = document.querySelector('#cart__items');
    // localStorage.clear();
    console.log(localStorage);
}
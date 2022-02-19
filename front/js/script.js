/* LIBS */
import { createArticles } from './data.js';

/* VARIABLES */

/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);

function initApp() {
    const itemsSection = document.getElementById('items');
    createArticles(itemsSection);
}
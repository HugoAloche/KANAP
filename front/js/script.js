/* LIBS */
import { getArticles } from './data.js';

/* VARIABLES */
const url = 'http://localhost:3000/api/products';

window.addEventListener('load', initApp);

function initApp() {
    const lstArticles = getArticles(url);
    console.log(lstArticles);
}
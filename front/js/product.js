import { setImageUrl, setTitle, setPrice, setDescription, setColors } from './data.js';
/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);
let storage = [];

if (localStorage.length > 0) {
    for (var key in localStorage) {
        if (key.includes('article')) {
            let article = {
                article_id: JSON.parse(localStorage.getItem(key)).article_id,
                article_color: JSON.parse(localStorage.getItem(key)).article_color,
                article_qte: JSON.parse(localStorage.getItem(key)).article_qte,
                article_price: JSON.parse(localStorage.getItem(key)).article_price,
                article_url: JSON.parse(localStorage.getItem(key)).article_url,
                article_alt: JSON.parse(localStorage.getItem(key)).article_alt,
                article_name: JSON.parse(localStorage.getItem(key)).article_name
            };
            storage.push(article);
        }
    }
}

function initApp() {
    const img = document.querySelector('#img');
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const description = document.querySelector('#description');
    const colors = document.querySelector('#colors');
    const submit = document.querySelector('#addToCart');
    const qte = document.querySelector('#quantity');

    let url = new URL(window.location.href);
    let id = url.searchParams.get('id');

    setImageUrl(id, img);
    setTitle(id, title)
    setPrice(id, price);
    setDescription(id, description);
    setColors(id, colors);

    submit.addEventListener('click', function() {
        setStorage(id, colors.options[colors.selectedIndex].text, parseInt(qte.value), parseInt(price.textContent), img.src, img.alt, title.textContent);
    })
}

/**
 * Fonction qui va enregistrée un article si il n'existe pas déjà
 * @param {id} id 
 * @param {String} color 
 * @param {Int} qte 
 * @param {Int} price 
 */
function setStorage(id, color, qte, price, url, alt, name) {
    let exist = 0;
    if (storage.length > 0) {
        storage.forEach(function(article, index) {
            if (article.article_id === id) {
                if (article.article_color === color) {
                    exist = 1;
                    let newQte = article.article_qte += qte;
                    updateArticleToStorage(index, newQte);
                }
            }
        });
        if (exist === 0) {
            addArticleToStorage(id, color, qte, price, url, alt, name);
        }
    } else {
        addArticleToStorage(id, color, qte, price, url, alt, name);
    }
}

function addArticleToStorage(id, color, qte, price, url, alt, name) {
    let article = {
        article_id: id,
        article_color: color,
        article_qte: qte,
        article_price: price,
        article_url: url,
        article_alt: alt,
        article_name: name
    };
    storage.push(article);

    storage.forEach(function(article, index) {
        localStorage.setItem('article' + index, JSON.stringify(article));
    });
}

function updateArticleToStorage(pIndex, pQte) {
    let color = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_color;
    let id = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_id;
    let price = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_price;
    let url = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_url;
    let alt = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_alt;
    let name = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_name;

    let article = {
        article_id: id,
        article_color: color,
        article_qte: pQte,
        article_price: price,
        article_url: url,
        article_alt: alt,
        article_name: name
    };

    localStorage.setItem('article' + pIndex, JSON.stringify(article));
}

function firstIndex() {
    return Object.keys(localStorage)[localStorage.length - 1].charAt(Object.keys(localStorage)[0].length - 1);
}
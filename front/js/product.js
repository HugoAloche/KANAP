import { setImageUrl, setTitle, setPrice, setDescription, setColors } from './data.js';
/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);
let storage = [];

if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        let article = {
            article_id: JSON.parse(localStorage.getItem(`article${i}`)).article_id,
            article_color: JSON.parse(localStorage.getItem(`article${i}`)).article_color,
            article_qte: JSON.parse(localStorage.getItem(`article${i}`)).article_qte,
            article_price: JSON.parse(localStorage.getItem(`article${i}`)).article_price,
            article_url: JSON.parse(localStorage.getItem(`article${i}`)).article_url,
            article_alt: JSON.parse(localStorage.getItem(`article${i}`)).article_alt,
            article_name: JSON.parse(localStorage.getItem(`article${i}`)).article_name
        };
        storage.push(article);
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
        storage.forEach((article, index) => {
            if (article.article_id === id) {
                if (article.article_color === color) {
                    exist = 1;
                    article.article_qte += qte;
                    // localStorage.setItem(`article${index}`.article_qte, JSON.stringify(article.article_qte));
                    // console.log(JSON.parse(localStorage.getItem(`article${index}`)).article_qte);
                    console.log(localStorage);
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
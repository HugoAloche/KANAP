/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);

function initApp() {
    const section = document.querySelector('#cart__items');
    const totalQuantity = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');
    totalQuantity.textContent = localStorage.length;
    console.log(localStorage);
    if (localStorage.length > 0) {
        totalPrice.textContent = priceOf(localStorage);
        for (let i = firstIndex(); 0 < localStorage.length; i++) {
            let color = JSON.parse(localStorage.getItem(`article${i}`)).article_color;
            let qte = JSON.parse(localStorage.getItem(`article${i}`)).article_qte;
            let price = JSON.parse(localStorage.getItem(`article${i}`)).article_price;
            let url = JSON.parse(localStorage.getItem(`article${i}`)).article_url;
            let alt = JSON.parse(localStorage.getItem(`article${i}`)).article_alt;
            let name = JSON.parse(localStorage.getItem(`article${i}`)).article_name;
            showArticle(section, color, qte, price, url, alt, name, i);
        }
    }

    // localStorage.clear();
}

/**
 * Crée un article à partir d'élément du localstorage
 * @param {section} pSection 
 * @param {color} pColor 
 * @param {Int16Array} pQte 
 * @param {Int16Array} pPrice 
 * @param {string} pURL 
 * @param {string} pAlt 
 * @param {string} pName 
 */
function showArticle(pSection, pColor, pQte, pPrice, pURL, pAlt, pName, pIndex) {
    let cart__item__img = document.createElement('div');
    cart__item__img.classList.add('cart__item__img');

    let cart__item__content = document.createElement('div');
    cart__item__content.classList.add('cart__item__content');

    let cart__item__content__description = document.createElement('div');
    cart__item__content__description.classList.add('cart__item__content__description');

    let cart__item__content__settings = document.createElement('div');
    cart__item__content__settings.classList.add('cart__item__content__settings');

    let cart__item__content__settings__quantity = document.createElement('div');
    cart__item__content__settings__quantity.classList.add('cart__item__content__settings__quantity');

    let cart__item__content__settings__delete = document.createElement('div');
    cart__item__content__settings__delete.classList.add('cart__item__content__settings__delete');

    let article = document.createElement('article');
    article.classList.add('cart__item');

    let img = document.createElement('img');
    img.src = pURL;
    img.alt = pAlt;

    let h2 = document.createElement('h2');

    let color = document.createElement('p');
    color.innerHTML = pColor;

    let price = document.createElement('p');
    price.innerHTML = pPrice + ' €';

    let qte = document.createElement('p');
    qte.innerHTML = 'Qté : ';

    let deletedText = document.createElement('p');
    deletedText.innerHTML = 'Supprimer';
    deletedText.addEventListener('click', function() {
        deleteArticle(pIndex);
    })

    let number = document.createElement('input');
    number.type = "number";
    number.classList.add('itemQuantity');
    number.min = 1;
    number.max = 100;
    number.value = pQte;

    h2.innerHTML = pName;

    let articles = pSection.appendChild(article)
    articles.appendChild(cart__item__img).appendChild(img);

    let description = articles.appendChild(cart__item__content).appendChild(cart__item__content__description);
    description.appendChild(h2);
    description.appendChild(color);
    description.appendChild(price);

    let settings = articles.appendChild(cart__item__content).appendChild(cart__item__content__settings);
    let quantity = settings.appendChild(cart__item__content__settings__quantity);
    let deleteted = settings.appendChild(cart__item__content__settings__delete);
    quantity.appendChild(qte);
    quantity.appendChild(number);
    deleteted.appendChild(deletedText);
}

function priceOf(pArray) {
    let sum = [];
    let price = 0;
    for (let i = firstIndex(); 0 < pArray.length; i++) {
        sum.push(JSON.parse(pArray.getItem('article' + i)).article_price * JSON.parse(pArray.getItem('article' + i)).article_qte);
    }
    sum.forEach(val => {
        price += val;
    })
    return price;
}

function deleteArticle(index) {
    localStorage.removeItem('article' + index);
}

function firstIndex() {
    return Object.keys(localStorage)[localStorage.length - 1].charAt(Object.keys(localStorage)[0].length - 1);
}
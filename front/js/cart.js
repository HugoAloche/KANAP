/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);

function initApp() {
    // localStorage.clear();
    const section = document.querySelector('#cart__items');
    const form = document.querySelector('.cart__order__form');
    const totalQuantity = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');
    form.addEventListener('submit', function(event) {
        checkForm(event);
    })
    totalQuantity.textContent = localStorage.length;
    if (localStorage.length > 0) {
        totalPrice.textContent = priceOf(localStorage);
        let k = 0;
        for (let i = firstIndex(); k < localStorage.length; k++) {
            let color = JSON.parse(localStorage.getItem(`article${i}`)).article_color;
            let qte = JSON.parse(localStorage.getItem(`article${i}`)).article_qte;
            let price = JSON.parse(localStorage.getItem(`article${i}`)).article_price;
            let url = JSON.parse(localStorage.getItem(`article${i}`)).article_url;
            let alt = JSON.parse(localStorage.getItem(`article${i}`)).article_alt;
            let name = JSON.parse(localStorage.getItem(`article${i}`)).article_name;
            showArticle(section, color, qte, price, url, alt, name, i);
            i++;
        }
    }
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
    number.addEventListener('change', function() {
        updateArticle(number, pIndex);
    })

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
    let k = 0;
    for (let i = firstIndex(); k < pArray.length; k++) {
        sum.push(JSON.parse(pArray.getItem('article' + i)).article_price * JSON.parse(pArray.getItem('article' + i)).article_qte);
        i++;
    }
    sum.forEach(val => {
        price += val;
    })
    return price;
}

function deleteArticle(index) {
    localStorage.removeItem('article' + index);
    location.reload();
}

function firstIndex() {
    return Object.keys(localStorage)[localStorage.length - 1].charAt(Object.keys(localStorage)[0].length - 1);
}

function updateArticle(input, pIndex) {
    let color = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_color;
    let id = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_id;
    let price = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_price;
    let url = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_url;
    let alt = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_alt;
    let name = JSON.parse(localStorage.getItem(`article${pIndex}`)).article_name;

    let article = {
        article_id: id,
        article_color: color,
        article_qte: input.value,
        article_price: price,
        article_url: url,
        article_alt: alt,
        article_name: name
    };

    localStorage.setItem('article' + pIndex, JSON.stringify(article));
    location.reload();
}

function checkForm(event) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const addrRegex = /^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)$/;
    if (!emailRegex.test(document.getElementById('email').value)) {
        event.preventDefault();
        document.getElementById('emailErrorMsg').textContent = "Votre email n'est pas valide.";
    } else if (!addrRegex.test(document.getElementById('address').value)) {
        event.preventDefault();
        document.getElementById('addressErrorMsg').textContent = "Votre adresse n'est pas valide.";
    }
}
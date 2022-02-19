import { setImageUrl, setTitle, setPrice, setDescription, setColors } from './data.js';
/* Une fois la page charger lance la fonction d'initialisation*/
window.addEventListener('load', initApp);

let storage = [];

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
        setStorage(id, colors.options[colors.selectedIndex].text, parseInt(qte.value));
    })
}

/**
 * Fonction qui va enregistrée un article si il n'existe pas déjà
 * @param {id} id 
 * @param {String} color 
 * @param {Int} qte 
 */
function setStorage(id, color, qte) {
    let exist = 0;
    if (storage.length > 0) {
        storage.forEach(article => {
            // Tant qu'il a pas vérifier tout les article
            if (article.article_id === id) {
                console.log("id exist");
                if (article.article_color === color) {
                    console.log("color exist");
                    exist = 1;
                    article.article_qte += qte;
                }
            }
        });
        if (exist === 0) {
            console.log("existe pas", exist);
            addArticleToStorage(id, color, qte);
        }
    } else {
        console.log("tableau était vide");
        addArticleToStorage(id, color, qte);
    }
    console.log(storage);
    localStorage.clear();
    // localStorage.id = storage[0].article_id;
    // localStorage.color = storage[0].article_color;
    // localStorage.qte = storage[0].article_qte;
}

function addArticleToStorage(id, color, qte) {
    let article = {
        article_id: id,
        article_color: color,
        article_qte: qte
    };
    storage.push(article);
}
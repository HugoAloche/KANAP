const url = 'http://localhost:3000/api/products';
/**
 * Fonction qui va crée chaque article disponible depuis l'API
 * @param {URL} pURL 
 * @param {HTMLElement} pSection 
 */
export async function createArticles(pSection) {
    await fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    // console.log(data);
                    data.forEach(elem => {
                        createArticle(pSection, elem.imageUrl, elem.altTxt, elem.name, elem.description, elem._id);
                    });
                })
        })
        .catch(function(error) {
            console.error('erreur : ' + error);
        });
}

/**
 * Fonction qui définis l'url et le alt d'une image selon l'id du produit donnée
 * @param {id} id 
 * @param {HTMLImageElement} img 
 */
export async function setImageUrl(id, img) {
    fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    data.forEach(elem => {
                        if (elem._id === id) {
                            img.src = elem.imageUrl;
                            img.alt = elem.altTxt;
                        }
                    })
                })
        })
}


/**
 * Fonction qui définie le contenu d'un h1 donnée selon l'id d'un produit
 * @param {id} id 
 * @param {HTMLTitleElement} h1 
 */
export async function setTitle(id, h1) {
    fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    data.forEach(elem => {
                        if (elem._id === id) {
                            h1.innerHTML = elem.name;
                            document.title = elem.name;
                        }
                    })
                })
        })
}


/**
 * Fonction qui définie le contenu d'un paragraphe donnée selon l'id d'un produit
 * @param {id} id 
 * @param {HTMLParagraphElement} p 
 */
export async function setPrice(id, p) {
    fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    data.forEach(elem => {
                        if (elem._id === id) {
                            p.innerHTML = elem.price;
                        }
                    })
                })
        })
}


/**
 * Fonction qui définie la description d'un paragraphe donnée selon l'id d'un produit
 * @param {id} id 
 * @param {HTMLParagraphElement} p 
 */
export async function setDescription(id, p) {
    fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    data.forEach(elem => {
                        if (elem._id === id) {
                            p.innerHTML = elem.description;
                        }
                    })
                })
        })
}


/**
 * Fonction qui définie les couleur d'un select donnée selon l'id d'un produit
 * @param {id} id 
 * @param {HTMLSelectElement} elect 
 */
export async function setColors(id, select) {
    fetch(url)
        .then(resp => {
            resp.json()
                .then(data => {
                    data.forEach(elem => {
                        if (elem._id === id) {
                            elem.colors.forEach(function callback(color, index) {
                                const option = document.createElement('option');
                                option.innerHTML = color;
                                option.value = index;
                                select.appendChild(option);
                            })
                        }
                    })
                })
        })
}


/**
 * Fonction qui va injecter des éléments html a une section donnée
 * @param {HTMLElement} section 
 * @param {URL} url 
 * @param {HTMLAllCollection} alt 
 * @param {HTMLParagraphElement} text 
 * @param {HTMLParagraphElement} desc 
 * @param {id} id 
 */
function createArticle(section, url, alt, text, desc, id) {
    let a = document.createElement('a');
    let article = document.createElement('article');
    let img = document.createElement('img');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    a.href = './product.html?id=' + id;
    h3.innerHTML = text;
    img.src = url;
    img.alt = alt;
    p.innerHTML = desc;
    let articles = section.appendChild(a).appendChild(article);
    articles.appendChild(img);
    articles.appendChild(h3);
    articles.appendChild(p);
}
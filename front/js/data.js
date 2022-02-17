let myHeaders = new Headers();

let myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};
export function getArticles(pURL) {
    fetch(pURL, myInit)
        .then(function(resp, ) {
            console.log(resp.json());
        })
        .then(function(data) {
            let articles = data.results;
            return articles.map();
        })
        .catch(function(error) {
            console.log(error);
        });
}
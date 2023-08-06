let API_KEY = "1bc95029f6cc4eaba53c27552423fff9";
let url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews (query){
    let response = await fetch(`${url}${query}&apikey=${API_KEY}`)
    let data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    let cardsContainer = document.getElementById('cards-container');
    let newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML= '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        let cardClone = newsCardTemplate.content.cloneNode(true);
        cardsContainer.appendChild(cardClone);
    });
}
let API_KEY = "1bc95029f6cc4eaba53c27552423fff9";
let url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("World"));

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
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    let newsImage = cardClone.querySelector('#news-image');
    let newsTitle = cardClone.querySelector('#news-title');
    let newsSource = cardClone.querySelector('#news-source');
    let newsDesc = cardClone.querySelector('#news-desc');

    let date = new Date(article.publishedAt).toLocaleString('eng-us', {
        timeZone: "Asia/Jakarta"
    });

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    newsSource.innerHTML = `${article.source.name} . ${date}`; 

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}

let currentSelectedNav= null;

function onNavBarClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}

let searchButton = document.getElementById('search-button');
let searchText = document.getElementById('news-input');

searchButton.addEventListener('click',()=>{
    let query = searchText.value;
    if (!query) {
        return;
    }
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})
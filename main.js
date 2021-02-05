

const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"

const createCard = (cover, HTML, header) => {

    cover.forEach((info) => {
        HTML.innerHTML += `
        <article class="card">
            <div class="imagen">
                <img src="${info.thumbnail.path + "." + info.thumbnail.extension}" alt="">
            </div>
            <div class="info">
                <h3 class="nombre">${info[header]}</h3>
            </div>
        </article>
        `
    });

};



const getInfo = (quest, header) => {
    const endPoint = URLBASE + quest + "?" + APIKEY

    fetch(endPoint).then((data) => {
        return data.json();
    }).then((elements) => {
        const listOfElements = elements.data.results
        const results = document.querySelector('.resultados')
        const containerCards = document.querySelector('.contenedor-cards')

        containerCards.innerHTML = ''
        results.innerHTML = ''
        results.innerHTML = elements.data.total
        createCard(listOfElements, containerCards, header);
    })
};


getInfo('comics', 'title');


const selectTipo = document.querySelector('#tipo')
const searchResults = (select) => {
    if (select.value == "comics") {
        getInfo(selectTipo.value, 'title')
    }
    else {
        getInfo('characters', 'name')
    }
}

selectTipo.onchange = () => searchResults(selectTipo)




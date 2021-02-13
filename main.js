

const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"
const ITEM_PER_PAGE = 20
let currentPage = 0

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



const getInfo = (resource, header, currentPage) => {
    const endPoint = URLBASE + resource + "?" + APIKEY + `&offset=${currentPage * ITEM_PER_PAGE}`

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


getInfo('comics', 'title', currentPage);


const typeOfResource = document.querySelector('#tipo')


const searchResults = (resource) => {

    switch (resource.value) {
        case 'comics':
            getInfo('comics', 'title', currentPage)
            break;
        default:
            getInfo('characters', 'name', currentPage)
            break;
    }
}

typeOfResource.onchange = () => searchResults(typeOfResource)


const nextPage = document.querySelector('#btn-next')
const previousPage = document.querySelector('#btn-previous')
const doubleNextPage = document.querySelector('#btn-double-next')
const doublePreviuosPage = document.querySelector('#btn-double-previous')

nextPage.onclick = () => {
    currentPage++
    searchResults(typeOfResource)
}


previousPage.onclick = () => {
    currentPage--
    searchResults(typeOfResource)
}

doubleNextPage.onclick = () => {
    currentPage += 2
    searchResults(typeOfResource)
}

doublePreviuosPage.onclick = () => {
    currentPage -= 2
    searchResults(typeOfResource)
}


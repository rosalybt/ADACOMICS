

const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"
const ITEM_PER_PAGE = 20

let currentPage = 0
let currentOrder = 'title'

const nextPage = document.querySelector('#btn-next')
const previousPage = document.querySelector('#btn-previous')
const doubleNextPage = document.querySelector('#btn-double-next')
const doublePreviuosPage = document.querySelector('#btn-double-previous')
const selectOrder = document.querySelector('#select-order')


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



const getInfo = (resource, header, currentPage, orden) => {
    const endPoint = URLBASE + resource + "?" + `offset=${currentPage * ITEM_PER_PAGE}` + `&orderBy=${orden}&` + APIKEY
    console.log(endPoint)
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


getInfo('comics', 'title', currentPage, currentOrder);


const typeOfResource = document.querySelector('#tipo')


const searchResults = (resource, orden) => {

    switch (resource.value) {
        case 'comics':
            getInfo('comics', 'title', currentPage, orden)
            break;
        default:
            getInfo('characters', 'name', currentPage, orden)
            break;
    }
}

typeOfResource.onchange = () => {
    currentPage = 0
    searchResults(typeOfResource, currentOrder)
}


nextPage.onclick = () => {
    currentPage++
    searchResults(typeOfResource, currentOrder)
}

previousPage.onclick = () => {
    currentPage--
    searchResults(typeOfResource, currentOrder)
}

doubleNextPage.onclick = () => {
    currentPage += 2
    searchResults(typeOfResource, currentOrder)
}

doublePreviuosPage.onclick = () => {
    currentPage -= 2
    searchResults(typeOfResource, currentOrder)
}

selectOrder.onchange = () => {
    currentOrder = selectOrder.value
    searchResults(typeOfResource, currentOrder)
}


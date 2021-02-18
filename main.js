

const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"
const ITEM_PER_PAGE = 20

let currentPage = 0
let currentOrder = 'title'

const nextPage = document.querySelector('#btn-next')
const previousPage = document.querySelector('#btn-previous')
const doubleNextPage = document.querySelector('#btn-double-next')
const doublePreviuosPage = document.querySelector('#btn-double-previous')
const selectBoxOrder = document.querySelector('#select-order')
const typeOfResource = document.querySelector('#tipo')
const inputText = document.querySelector('#input-texto')
const form = document.querySelector('#form')


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

const createURL = (resource, currentPage, orden, userSearch) => {

    if (userSearch.trim() != '' && resource === 'comics') {
        return URLBASE + resource + "?" + `offset=${currentPage * ITEM_PER_PAGE}` +
            `&orderBy=${orden}` + `&titleStartsWith=${userSearch}&` + APIKEY

    } else if (userSearch.trim() != '' && resource === 'characters') {
        return URLBASE + resource + "?" + `offset=${currentPage * ITEM_PER_PAGE}` +
            `&orderBy=${orden}` + `&nameStartsWith=${userSearch}&` + APIKEY

    } else {
        return URLBASE + resource + "?" + `offset=${currentPage * ITEM_PER_PAGE}` +
            `&orderBy=${orden}&` + APIKEY
    }


}

const getInfo = (resource, header, currentPage, orden, inputTextValue) => {
    let url = createURL(resource, currentPage, orden, inputTextValue)

    fetch(url).then((data) => {
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


getInfo('comics', 'title', currentPage, currentOrder, inputText.value);


const searchResults = (resource, orden, inputText) => {

    switch (resource.value) {
        case 'comics':
            getInfo('comics', 'title', currentPage, orden, inputText)
            break;
        case 'personajes':
            getInfo('characters', 'name', currentPage, orden, inputText)
            break;
    }
}


const changeOptionsSelectBox = (resource, selectBox) => {

    selectBox.options.length = 0
    if (resource.value === 'comics') {
        selectBox.options[selectBox.options.length] = new Option('A-Z', 'title')
        selectBox.options[selectBox.options.length] = new Option('Z-A', '-title')
        selectBox.options[selectBox.options.length] = new Option('Mas nuevo', '-focDate');
        selectBox.options[selectBox.options.length] = new Option('Mas viejo', 'focDate');

    } else {
        selectBox.appendChild(new Option('A-Z', 'name', true))
        selectBox.appendChild(new Option('Z-A', '-name'))
    }

}

typeOfResource.onchange = () => {
    currentPage = 0
    changeOptionsSelectBox(typeOfResource, selectBoxOrder)
    currentOrder = selectBoxOrder.value
}

nextPage.onclick = () => {
    currentPage++
    searchResults(typeOfResource, currentOrder, inputText.value)
}

previousPage.onclick = () => {
    currentPage--
    searchResults(typeOfResource, currentOrder, inputText.value)
}

doubleNextPage.onclick = () => {
    currentPage += 2
    searchResults(typeOfResource, currentOrder, inputText.value)
}

doublePreviuosPage.onclick = () => {
    currentPage -= 2
    searchResults(typeOfResource, currentOrder, inputText.value)
}

selectBoxOrder.onchange = () => currentOrder = selectBoxOrder.value

form.onsubmit = (e) => {
    e.preventDefault()
    searchResults(typeOfResource, currentOrder, inputText.value)
}
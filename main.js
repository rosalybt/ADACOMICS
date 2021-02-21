
const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"
const ITEM_PER_PAGE = 20
// ITEM_PER_PAGE ---> shows a maximum of 20 results per page

let currentPage = 0
let currentOrder = 'title'
let totalResultsDisplayed = 0
let remainingResults = 0

const nextPage = document.querySelector('#btn-next')
const previousPage = document.querySelector('#btn-previous')
const doubleNextPage = document.querySelector('#btn-double-next')
const doublePreviuosPage = document.querySelector('#btn-double-previous')
const selectBoxOrder = document.querySelector('#select-order')
const typeOfResource = document.querySelector('#tipo')
const inputText = document.querySelector('#input-texto')
const totalResults = document.querySelector('.total-results-showed')
const containerCards = document.querySelector('.contenedor-cards')
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
    checkPaging(nextPage, doubleNextPage, previousPage, doublePreviuosPage)
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

const disable = (element) => {
    element.disabled = true
    element.classList.add('disable')
}
const enable = (element) => {
    element.disabled = false
    element.classList.remove('disable')
}

const checkPaging = (nextPage, doubleNextPage, previousPage, doublePreviuosPage) => {

    let results = parseInt(totalResults.textContent)

    /*next options*/
    if (remainingResults <= 0) {
        disable(nextPage)
    } else {
        enable(nextPage)
    }

    if (remainingResults <= ITEM_PER_PAGE) {
        disable(doubleNextPage)
    } else {
        enable(doubleNextPage)
    }

    /*Previuos opstions*/
    if ((remainingResults + ITEM_PER_PAGE) === results) {
        disable(previousPage)
        disable(doublePreviuosPage)
    } else {
        enable(previousPage)
    }
    //if remainingResult is less than results minus 40 (two pages) then enable the button
    if (remainingResults < (results - ITEM_PER_PAGE * 2)) {
        enable(doublePreviuosPage)
    }

}

const calculateRemainingResults = () => {
    remainingResults = parseInt(totalResults.textContent) - ((currentPage + 1) * ITEM_PER_PAGE)
}

const getInfo = (resource, header, orden, inputTextValue) => {
    let url = createURL(resource, orden, inputTextValue)

    fetch(url).then((data) => {
        return data.json();
    }).then((elements) => {
        const listOfElements = elements.data.results

        containerCards.innerHTML = ''
        totalResults.innerHTML = ''
        totalResults.innerHTML = elements.data.total
        calculateRemainingResults()
        createCard(listOfElements, containerCards, header);
    })

};




getInfo('comics', 'title', currentOrder, inputText.value);

const searchResults = (resource, orden, inputText) => {

    switch (resource.value) {
        case 'comics':
            getInfo('comics', 'title', orden, inputText)
            break;
        case 'personajes':
            getInfo('characters', 'name', orden, inputText)
            break;
    }
}

const changeOptionsSelectBox = (resource, selectBox) => {

    selectBox.options.length = 0
    if (resource.value === 'comics') {

        selectBox.appendChild(new Option('A-Z', 'title'))
        selectBox.appendChild(new Option('Z-A', '-title'))
        selectBox.appendChild(new Option('Mas nuevo', '-focDate'))
        selectBox.appendChild(new Option('Mas viejo', 'focDate'))

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
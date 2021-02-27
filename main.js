
const URLBASE = "https://gateway.marvel.com/v1/public/"
const APIKEY = "apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25"
const ITEM_PER_PAGE = 20
// ITEM_PER_PAGE ---> shows a maximum of 20 results per page

let currentPage = 0
let currentOrder = 'title'
let totalResultsDisplayed = 0
let remainingResults = 0
let secondarySearch = ''
let cardClicked = false

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
const containerMoreInfo = document.querySelector('.container-more-info')
const moreInfoSection = document.querySelector('.more-info')
const btnBack = document.querySelector('.btn-back')
const titleResults = document.querySelector('.title-result')
const btnDarkMode = document.querySelector('.modo-oscuro')
const overlay = document.querySelector('.overlay-loading')


const createCard = (covers, HTML) => {
    // if click on a card, the class is assigned to the corresponding resource
    const resource = cardClicked ? secondarySearch : typeOfResource.value

    covers.forEach((info) => {
        const header = info.title ? 'title' : 'name'

        HTML.innerHTML += `
            <article class="${resource}-card card" data-id=${info.id} data-resource=${resource}>
                <div class="imagen">
                    <img src=${info.thumbnail.path}/portrait_uncanny.${info.thumbnail.extension} alt="cover">
                </div>
                <div class="info">
                    <h3 class="nombre">${info[header]}</h3>
                </div>
            </article>
    `
    });
    addOnClickEventToACard()
    checkPaging(nextPage, doubleNextPage, previousPage, doublePreviuosPage)
};

const addOnClickEventToACard = () => {
    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        card.onclick = () => {
            let resource = card.dataset.resource
            let id = card.dataset.id
            showMoreInfoResource(resource, id)
            cardClicked = true
        }
    })
}

const getInfoUniqueResource = (resource, id) => {

    let url = createURL(resource, null, '', id)
    fetch(url).then((data) => {
        return data.json();
    }).then((element) => {
        const data = element.data.results[0]
        const result = data.comics || data.characters

        createCardMoreInfo(data, resource)
        getInfo(result.collectionURI + "?" + APIKEY)
    })
}

const createCardMoreInfo = (info, resource) => {
    show(containerMoreInfo)
    moreInfoSection.innerHTML = ''

    if (resource === 'comics') {
        const date = new Intl.DateTimeFormat('es-DO').format(info.dates[0].date.type)
        const creators = info.creators.returned > 0 ? info.creators.items[0].name : ''

        secondarySearch = 'characters'
        titleResults.innerHTML = 'Personajes'
        moreInfoSection.innerHTML = `
    <div>
        <img src=${info.thumbnail.path}/portrait_uncanny.${info.thumbnail.extension} alt = "cover" >
    </div>

    <div class="info">
        <h2 class="titulo">${info.title}</h2>
        <h3>Publicado:</h3>
        <p class="publication-date">${date ? date : ''}</p>
        <h3>Guionista(s):</h3>
        <p class="scriptwriter">${creators ? creators : ''}</p>
        <h3>Descripcion:</h3>
        <p class="description">${info.description ? info.description : ''}</p>
    </div>`

    } else {
        secondarySearch = 'comics'
        titleResults.innerHTML = 'Comics'
        moreInfoSection.innerHTML = `
        <div>
            <img src=${info.thumbnail.path}/portrait_uncanny.${info.thumbnail.extension} alt = "cover" >
        </div>

        <div class="info">
            <h2 class="name">${info.name}</h2>
            <h3>Descripcion:</h3>
            <p class="description">${info.description ? info.description : ''}</p>
        </div>`
    }

}

const showMoreInfoResource = (resource, id) => getInfoUniqueResource(resource, id)

const createURL = (resource, orden, userSearch, id) => {
    if (id) {
        return URLBASE + resource + "/" + id + "?" + APIKEY
    }
    else if (userSearch.trim() && resource === 'comics') {
        return `${URLBASE}${resource}?offset=${currentPage * ITEM_PER_PAGE}
        &orderBy=${orden}&titleStartsWith=${userSearch}&${APIKEY}`

    } else if (userSearch.trim() && resource === 'characters') {
        return `${URLBASE}${resource}?offset=${currentPage * ITEM_PER_PAGE}
            &orderBy=${orden}&nameStartsWith=${userSearch}&${APIKEY}`

    } else if (!userSearch.trim()) {
        return `${URLBASE}${resource}?offset=${currentPage * ITEM_PER_PAGE}
        &orderBy=${orden}&${APIKEY}`
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

const hide = (element) => element.classList.add('hidden')
const show = (element) => element.classList.remove('hidden')

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

const getInfo = (url) => {

    fetch(url).then((data) => {
        return data.json();
    }).then((elements) => {
        const listOfElements = elements.data.results

        containerCards.innerHTML = ''
        totalResults.innerHTML = ''
        totalResults.innerHTML = elements.data.total
        calculateRemainingResults()

        if (listOfElements.length) createCard(listOfElements, containerCards);
        else containerCards.innerHTML = '<h3>No se han encontrado resultados</h3>';
        hide(overlay)
    })
};

getInfo(URLBASE + 'comics?offset=0&orderBy=title&' + APIKEY);

const searchResults = (resource, orden, inputText) => {
    show(overlay)

    let url = createURL(resource.value, orden, inputText)

    switch (resource.value) {
        case 'comics':
            getInfo(url)
            break;
        case 'characters':
            getInfo(url)
            break;
    }
    titleResults.innerHTML = 'Resultados'
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


const saveDarkMode = () => {
    const body = document.body
    body.classList.toggle('dark')
    btnDarkMode.classList.toggle('active')

    body.classList.contains('dark') ? localStorage.setItem('modo-oscuro', 'true') : localStorage.setItem('modo-oscuro', 'false')
}

const checkDarkMode = () => {

    if (localStorage.getItem('modo-oscuro') === 'true') {
        document.body.classList.add('dark');
        btnDarkMode.classList.add('active');
    } else {
        document.body.classList.remove('dark');
        btnDarkMode.classList.remove('active');
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
    remainingResults = 0
    secondarySearch = typeOfResource.value

    hide(containerMoreInfo)
    searchResults(typeOfResource, currentOrder, inputText.value)
}

btnBack.onclick = () => {
    cardClicked = false
    searchResults(typeOfResource, currentOrder, inputText.value)
    hide(containerMoreInfo)
}

checkDarkMode()
btnDarkMode.onclick = () => saveDarkMode()


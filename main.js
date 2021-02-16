

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
const typeOfResource = document.querySelector('#tipo')

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


// debugger
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





const searchResults = (resource, orden) => {

    switch (resource.value) {
        case 'comics':
            getInfo('comics', 'title', currentPage, orden)
            break;
        case 'personajes':
            getInfo('characters', 'name', currentPage, orden)
            break;
    }
}

debugger
const changeOptionSelect = (resource, selectMultiOp) => {
    // console.log(selectMultiOp.options[0])
    // console.log(selectMultiOp.options[1])
    // console.log(selectMultiOp.options[2])
    // console.log(selectMultiOp.options[3])
    let asc = document.createElement('option')
    let desc = document.createElement('option')
    asc.setAttribute('AZ', 'name')
    desc.setAttribute('ZA', '-name')
    if (resource.value === 'comics') {


        selectMultiOp.options[selectMultiOp.options.length] = new Option('A-Z', 'title')
        selectMultiOp.options[selectMultiOp.options.length] = new Option('Z-A', '-title')
        selectMultiOp.options[selectMultiOp.options.length] = new Option('Mas nuevo', '-focDate');
        selectMultiOp.options[selectMultiOp.options.length] = new Option('Mas viejo', 'focDate');



    } else {
        selectMultiOp.options.length = 0
        selectMultiOp.appendChild(new Option('A-Z', 'name', true))
        selectMultiOp.appendChild(new Option('Z-A', '-name'))
    }

}

typeOfResource.onchange = () => {
    currentPage = 0
    debugger
    changeOptionSelect(typeOfResource, selectOrder)
    currentOrder = selectOrder.value
    // debugger

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


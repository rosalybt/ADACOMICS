let currentPage = 1
let numberOfPages = 0




const createCard = (cover, HTML) => {

    cover.forEach((info) => {
        HTML.innerHTML += `
        <article class="card">
            <div class="imagen">
                <img src="${info.thumbnail.path + "." + info.thumbnail.extension}" alt="">
            </div>
            <div class="info">
                <h3 class="nombre">${info.title}</h3>
            </div>
        </article>
        `
    });

};


const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "ab8edd3b8eb3e77c63213cd2e9ea3d25"
const getInfo = (url) => {
    fetch(url).then((data) => {
        return data.json();
    }).then((cover) => {
        console.log(cover)
        const results = document.querySelector('.resultados')
        const containerCards = document.querySelector('.contenedor-cards')
        containerCards.innerHTML = ''
        results.innerHTML = ''
        results.innerHTML = cover.data.total
        // numberOfPages = cover.info.pages
        createCard(cover.data.results, containerCards);
    })
};

// getInfo('https://rickandmortyapi.com/api/character');

getInfo('https://gateway.marvel.com/v1/public/comics?apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25');

// fetch('https://gateway.marvel.com/v1/public/comics?apikey=ab8edd3b8eb3e77c63213cd2e9ea3d25')
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         console.log(data)
//     })

const nextPage = document.querySelector('#btn-next')
const previousPage = document.querySelector('#btn-previous')
const doubleNextPage = document.querySelector('#btn-double-next')
const doublePreviousPage = document.querySelector('#btn-double-previous')

nextPage.onclick = () => {
    currentPage += 1
    getInfo(`https://rickandmortyapi.com/api/character?page=${currentPage}`)

}

previousPage.onclick = () => {
    currentPage -= 1
    if (currentPage) getInfo(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
}

doubleNextPage.onclick = () => {
    currentPage += 2
    if (currentPage <= numberOfPages) getInfo(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
}

doublePreviousPage.onclick = () => {
    currentPage -= 2
    if (currentPage) getInfo(`https://rickandmortyapi.com/api/character?page=${currentPage}`)

}

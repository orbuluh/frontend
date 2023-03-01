let quotesDiv = document.getElementById('quotes')
fetch('https://api.kanye.rest')
    .then(res => res.json())
    .then(quote => {
        quotesDiv.innerHTML += `<p> ${quote.quote} </p>`
    })

let catDiv = document.getElementById('cat-pic')
let catButton = document.getElementById('give-cat')


catButton.addEventListener("click", evt => {
    fetch('https://api.thecatapi.com/v1/images/search?')
        .then(res => res.json())
        .then(cats => {
            cats.forEach(cat => {
                catDiv.innerHTML = `random cat pic <img src="${cat.url}" alt="kitty" />`
            })
        })
})
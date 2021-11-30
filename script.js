const quote = document.querySelector("#quote")
const text = document.querySelector("#text")
const author = document.querySelector("#author")
const btnGenerate = document.querySelector("#btn-generate")
const btnCopy = document.querySelector("#btn-copy")
const tooltip = document.querySelector("#tooltip")

const getQuote = async () => {
    showLoading(true)
    try{
        const url = "https://type.fit/api/quotes"
        const getData = await fetch(url).then(res => res.json())
        showLoading(false)
        display(getData)
    }catch(e){
        console.log(e)
    }
}

const display = data => {
    let index = Math.floor(Math.random() * data.length)
    text.innerHTML = `<q> ${data[index].text} </q>`
    author.innerHTML = data[index].author ? ` ~ ${data[index].author} ~` : "~ anonymous ~"
    tooltip.innerHTML = "copy"
}

const showLoading = isLoading => {
    if(isLoading){
        text.innerHTML = ""
        author.innerHTML = ""
        quote.setAttribute("class", "loader")
    }else{
        quote.setAttribute("class", "quote")
    }
}

btnCopy.addEventListener("click", () => { 
    navigator.clipboard.writeText(text.innerText+"\n" +author.innerText)
    tooltip.innerHTML = "copied"
})

btnGenerate.addEventListener("click", getQuote)

getQuote()
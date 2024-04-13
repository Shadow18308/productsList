const titleInput = document.querySelector(".title")
const priceInput = document.querySelector(".price")
const descriptionInput = document.querySelector(".desc")
const idInput = document.querySelector(".id")
const urlInput = document.querySelector(".url")

const container= document.querySelector(".container")

const getBtn=document.querySelector(".getBtn")
const postBtn=document.querySelector(".postBtn")

async function getProducts(){
    return await fetch('https://api.escuelajs.co/api/v1/products')
    .then(res => res.json())
    .catch(err=> {throw new err})
}

getProducts()
.then(posts=>{
    renderProducts(posts)
})


function renderProducts(response){
    const fragment = document.createDocumentFragment()
    response.forEach((product)=>{
        const card = createProductTemplate(product)
        fragment.appendChild(card)
    })
    container.appendChild(fragment)
}

function createProductTemplate({id,title,price}){
    const div=document.createElement('div')
    div.classList.add("card")
    const cardId=document.createElement('p')
    cardId.textContent=id
    const cardTitle=document.createElement('p')
    cardTitle.textContent=title
    const cardPrice=document.createElement('p')
    cardPrice.textContent=price
    div.appendChild(cardId)
    div.appendChild(cardTitle)
    div.appendChild(cardPrice)
    return div
}
postBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    sendProduct()
})

async function sendProduct(){
    return await fetch('https://api.escuelajs.co/api/v1/products',{
        method: 'POST',
        headers:{'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            title: `${titleInput.value}`,
            price: Number(`${priceInput.value}`),
            description: `${descriptionInput.value}`,
            categoryId: Number(`${idInput.value}`),
            images: [`${urlInput.value}`],
        })
    })
    .then(res => res.json())
    .then(product=>console.log(product))
    .catch(err => console.log(err))
}

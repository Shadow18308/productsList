const titleInput = document.querySelector(".title")
const priceInput = document.querySelector(".price")
const descriptionInput = document.querySelector(".desc")
const idInput = document.querySelector(".id")
const urlInput = document.querySelector(".url")

const container= document.querySelector(".container")

const getBtn=document.querySelector(".getBtn")
const postBtn=document.querySelector(".postBtn")


fetch('https://api.escuelajs.co/api/v1/products')
.then(res=>res.json())
.then(res => console.log(res))


function getProducts(cb){
    fetch('https://api.escuelajs.co/api/v1/products')
    .then(res => cb(res.json()))
}
function renderProducts(response){
    console.log(response);
    const fragment = document.createDocumentFragment()
    response.forEach((product)=>{
        const card = createProductTemplate(product)
        fragment.appendChild(card)
    })
    container.appendChild(fragment)
}https://github.com/Shadow18308/productsList.git

function createProductTemplate({id,title,price}){
    const div=document.createElement('div')
    div.classList.add("card")
    const cardId=document.createElement('p')
    cardId.textContent=id
    const cardTitle=document.createElement('p')
    cardId.textContent=title
    const cardPrice=document.createElement('p')
    cardId.textContent=price
    div.appendChild(cardId)
    div.appendChild(cardTitle)
    div.appendChild(cardPrice)
    return div
}
postBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    sendProduct()
})

function sendProduct(){
    fetch('https://api.escuelajs.co/api/v1/products', {
      method: 'POST',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({
        title:`${titleInput.value}`,
        price:Number(`${priceInput.value}`),
        description:`${descriptionInput.value}`,
        categoryId:Number(`${idInput.value}`),
        images:[`${urlInput.value}`]
      })
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}
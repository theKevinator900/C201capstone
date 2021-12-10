const url = '/api/v1/products'

const container = document.querySelector('.store-container')

const fetchProducts = async () => {
  try{
    const {data: {results}} = await axios.get(url)
    const tempProducts = results.map( (product) => {
      return `<div class="product-card">
<div class="product-title">${product.name}</div>
<div class="product-price">${product.price}</div>
<div class="img-container"> <img src="${product.image}" alt="${product.name}" class="product-img"> </div>
<button class="add-btn"> Add to Cart </button>
</div>`
    }).join('')
    container.innerHTML = tempProducts;
    const buttons = document.getElementsByClassName('add-btn')
    console.log(buttons);
    for(let button of buttons){
      button.addEventListener('click', addToCart)
    }
  } catch (err) {
    console.error(err);
  }
}
fetchProducts()

const addToCart = async (e) => {
  const name = e.target.parentElement.children[0].innerHTML
  console.log(name);

  const {data} = await axios.get(`${url}`, {name: name})
  console.log(data);
}

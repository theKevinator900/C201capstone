const cartUrl = '/api/v1/cart'
const productUrl = '/api/v1/products'

const itemsContainer = document.querySelector('.items-container')

const fetchProduct = async (id) => {
  try{
    const { data } = await axios.get(`${productUrl}/${id}`)
    return data;
  } catch (err) {
    console.error(err);
  }
}

const fetchCart = async () => {
  try {
    const {data: {cart}} = await axios.get(cartUrl)
    let tempProducts = [];
    for(product of cart[0].products){
      let singleProduct = await fetchProduct(product.productID)
      tempProducts.push(singleProduct)
    }
    let tempCart = cart[0].products.map( (product, i) => {
      const {productID, quantity} = product;
      const {image, name, price} = tempProducts[i]
      return `<div class="item">
<div class="img-container">
<img src="${image}" alt="picture" class="product-img">
</div>
<div class="product-info">
<h3 class="product-name">${name}</h3>
<p class="price">${price}</p>
<p class="quantity"> ${quantity} </p>
</div>
<div class="button-container">
<button class="delete">Delete</button>
</div>
</div>
`
    }).join('')
    itemsContainer.innerHTML = tempCart;
    let deleteBtns = document.getElementsByClassName('delete')
    console.log(deleteBtns);
    for(elem of deleteBtns) {
      elem.addEventListener('click', removeFromCart)
    }
  } catch (err) {
    console.error(err);
  }
}
fetchCart();

const removeFromCart = async (e) => {
  let name = e.target.parentElement.parentElement.children[1].children[0].innerHTML

  const {data : {results}} = await axios.get(`${productUrl}/`)
  const deletedProduct = results.filter( (result) => name == result.name)[0]
  
  const {data: {cart: [currCart]}} = await axios.get(`${cartUrl}/`)
  const currProducts = currCart.products
  const newProducts = currProducts.filter( (product) => product.productID !== deletedProduct._id)
  console.log(newProducts);

  const updatedCart = await axios.patch(cartUrl, {products: newProducts})

  fetchCart();
}


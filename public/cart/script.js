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
<p class="price">${price} x ${quantity}</p>
</div>
<div class="button-container">
<button class="increase"> + </button>
<button class="delete">Delete</button>
<button class="decrease"> - </button>
</div>
</div>
`
    }).join('')
    itemsContainer.innerHTML = tempCart;
    let deleteBtns = document.getElementsByClassName('delete')
    for(elem of deleteBtns) {
      elem.addEventListener('click', removeFromCart)
    }
    let increaseBtns = document.getElementsByClassName('increase')
    for(elem of increaseBtns){
      elem.addEventListener('click', increase)
    }
    let decreaseBtns = document.getElementsByClassName('decrease')
    for(elem of decreaseBtns){
      elem.addEventListener('click', decrease)
    }
  } catch (err) {
    console.error(err);
  }
}
fetchCart();

const getProduct = async (name) => {
  const {data : {results}} = await axios.get(`${productUrl}/`)
  return results.filter( (result) => name == result.name)[0]
}

const removeFromCart = async (e) => {
  let name = e.target.parentElement.parentElement.children[1].children[0].innerHTML
  
  const deletedProduct = await getProduct(name)
  
  const {data: {cart: [currCart]}} = await axios.get(`${cartUrl}/`)
  const currProducts = currCart.products
  const newProducts = currProducts.filter( (product) => product.productID !== deletedProduct._id)
  console.log(newProducts);

  const updatedCart = await axios.patch(cartUrl, {products: newProducts})

  fetchCart();
}

const increase = async (e) => {
  let name = e.target.parentElement.parentElement.children[1].children[0].innerHTML
  let oldProduct = await getProduct(name)

  const {data: {cart: [currCart]}} = await axios.get(`${cartUrl}/`);
  const currProducts = currCart.products;
  const newProducts = currProducts.map( (product) => {
    if(product.productID !== oldProduct._id) return product;
    return {productID: oldProduct._id, quantity: Number(product.quantity) + 1}
  })  
  
  const updatedCart = await axios.patch(cartUrl, {products: newProducts})
  fetchCart();
}

const decrease = async (e) => {
  let name = e.target.parentElement.parentElement.children[1].children[0].innerHTML
  let oldProduct = await getProduct(name)

  const {data: {cart: [currCart]}} = await axios.get(`${cartUrl}/`);
  const currProducts = currCart.products;
  let remove = false;
  const newProducts = currProducts.map( (product) => {
    if(product.productID !== oldProduct._id) return product;
    if(product.quantity == 1){
      remove = true;
      return product;
    }
    return {productID: oldProduct._id, quantity: Number(product.quantity) - 1}
  })

  if(remove) return removeFromCart(e)
  
  const updatedCart = await axios.patch(cartUrl, {products: newProducts})
  fetchCart();
}

const checkout = () => {
  window.location.href = "/checkout"
}
document.getElementsByClassName('checkout')[0].addEventListener('click', checkout)
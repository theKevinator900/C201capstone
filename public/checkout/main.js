const totalPriceText = document.getElementById('total-price')
const shippingFeeText = document.getElementById('shipping-fee')
const productsPriceText = document.getElementById('products-price')

const purchase = async () => {
  const {data: {cart : [products]}} = await axios.get('/api/v1/cart')
  boughtProducts = products.products

  let prices = [];
  for(let product of boughtProducts) {
    let {data: fullProduct} = await axios.get(`/api/v1/products/${product.productID}`)
    console.table(product)
    console.table(fullProduct)
    let price = Number(fullProduct.price.split('$')[1])
    prices.push(price * product.quantity)
  }
  let total_amount = prices.reduce( (total, curr) => total + curr)
  let shipping_fee = prices.length * 2.57

  productsPriceText.innerHTML = `Products: $${total_amount}`
  shippingFeeText.innerHTML = `Shipping: $${shipping_fee}`
  totalPriceText.innerHTML = `Total: $${total_amount + shipping_fee}`

  total_amount = total_amount * 100
  shipping_fee = shipping_fee * 100

  var stripe = Stripe(
    'pk_test_51K4A32CvmeKcFcsFDLRIFxEkZKFR9MrrcvjjqJE1EESdORVmcCZwLZ3ytGfKwmpAGaT1eWtNlSyqRMMc5YLRLxbJ00FQUPGmYx'
  );
  
  document.querySelector('button').disabled = true;
  fetch('/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({ purchase, total_amount, shipping_fee }),
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      var elements = stripe.elements();
  
      var style = {
        base: {
          color: '#32325d',
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#32325d',
          },
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      };
  
      var card = elements.create('card', { style: style });
      card.mount('#card-element');
  
      card.on('change', function (e) {
        document.querySelector('button').disabled = e.empty;
        document.querySelector('#card-error').textContent = e.error
          ? e.error.message
          : '';
      });
  
      var form = document.getElementById('payment-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        payWithCard(stripe, card, data.clientSecret);
      });
    });
}


//* Calls stripe.confirmCardPayment
//* If the card requires authentication, Stripe shows a pop-up modal to
//* prompt the user to enter authentication details without leaving the page

const payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        showError(result.error.message);
      } else {
        orderComplete(result.paymentIntent.id);
      }
    });
};

const orderComplete = async function (paymentIntentId) {
  loading(false);
  document
  .querySelector('.result-message a')
  .setAttribute(
    'href', 
    'https://dashboard.stripe.com/test/payments' + paymentIntentId
    );
    document.querySelector(".result-message").classList.remove('hidden')
    document.querySelector('button').disabled = true;

    let data = await axios.get('/send')
    let deleted = await axios.patch('/api/v1/cart', {products: []})
    let timeout = setTimeout( () => {
      window.location.href = "/store"
    }, 5000)
}

const showError = function (errorMsgText) {
  loading(false);
  const errorMsg = document.querySelector('#card-error')
  errorMsg.textContent = errorMsgText;
  setTimeout( () => {
    errorMsg.textContent = "";
  }, 4000)
}

const loading = function (isLoading) {
  if(isLoading) {
    document.querySelector('button').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('button').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
}

purchase();
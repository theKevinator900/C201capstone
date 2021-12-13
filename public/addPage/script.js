const url = '/api/v1'

const nameInput = document.querySelector('#name')
const priceInput = document.querySelector('#price')
const imageInput = document.querySelector('#image')
const productForm = document.querySelector('.product-form')

let imageValue;

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameValue = nameInput.value;
  const priceValue = priceInput.value;
  try{
    const product = {name: nameValue, price: priceValue, image: imageValue} 
    await axios.post(`${url}/products`, product)
    nameInput.value = '';
    priceInput.value = '';
    imageInput.value = '';
  } catch (err) {
    console.error(err);
  }
})

imageInput.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0]
  const formData = new FormData()
  formData.append('image', imageFile)

  try{
    const{
      data: {
        image: {
          src
        }
      }
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    imageValue = src;
  } catch (err) {
    imageValue = null;
    console.error(err);
  }
})
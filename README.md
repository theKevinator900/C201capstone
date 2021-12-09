# C201capstone

# Models

### Products
- name*
  - String
  - unique
- price*
  - String
- img*
  -String (url to img storage)

### Cart
- Products*
  - Array
    - Product - the id to a product
    - Quantity - the amount of a certain product

# Controllers

### Uploading
- uploadImage
  - takes a req.file and uploads the file to cloudinary

### Products
- createProduct
  - creates a product
- getProducts
  - gets all products
- getProduct
  - gets a specific product
- deleteProduct
  - remove a products document

### Cart
- updateCart
  - adds or removes a product id to the cart or changes quantity
- getCart
  - returns all items in the cart
- createCart
  - only supposed to be used once in development to create a cart in the db
- deleteCarts
  - for development, deletes every cart if more than one is every created

# Routes

### productsRoute
- /
  - post: createProduct
  - get: getProducts
- /:id
  - delete: deleteProduct
  - get: getProduct

### cartRoute
- /
  - get: getCart
  - patch: updateCart
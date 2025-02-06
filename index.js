const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
// Add an Item to the Cart
function addItemToCart(productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(newItem);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let updatedCart = addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: updatedCart });
});
//Edit Quantity of an Item in the Cart
function editItemQuantity(productId, quantity) {
  let product = cart.find((item) => item.productId === productId);
  if (product) {
    product.quantity = quantity;
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let updatedCart = editItemQuantity(productId, quantity);
  res.json({ cartItems: updatedCart });
});
//Delete an Item from the Cart
function removeItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  return cart;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  removeItem(productId);
  res.json({ cartItems: cart });
});
// Read Items in the Cart
function getCartItems() {
  return { cartItems: cart };
}

app.get('/cart', (req, res) => {
  res.json(getCartItems());
});

//Calculate Total Quantity of Items in the Cart
function getTotalQuantity() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return { totalQuantity: total };
}

app.get('/cart/total-quantity', (req, res) => {
  res.json(getTotalQuantity());
});
//Calculate Total Price of Items in the Cart
function getTotalPrice() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity * cart[i].price;
  }
  return { totalPrice: total };
}

app.get('/cart/total-price', (req, res) => {
  res.json(getTotalPrice());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

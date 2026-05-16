export let cart;
loadFromLocalStorage();
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}
export function addToCart(productId, quantity = 1) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
      deliveryOptionId: 1,
    });
  }
  saveToLocalStorage();
}
export function UpdateCartQuantityDisplay() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector(".cart-quantity").innerText = cartQuantity;
}
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.id !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}
export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function updateCartItemDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}
export function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log("loaded Cart");
    fun();
  });
  xhr.open("GET", "http://supersimplebackend.dev/cart");
  xhr.send();
}

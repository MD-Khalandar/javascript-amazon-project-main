export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}
export function addToCart(productId, quantity) {
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
    });
  }
  console.log(cart);
}
export function UpdateCartQuantityDisplay() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector(".cart-quantity").innerText = cartQuantity;
}

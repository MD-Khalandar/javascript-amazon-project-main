export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

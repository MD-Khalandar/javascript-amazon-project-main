cart = JSON.parse(localStorage.getItem("cart")) || [];
cartQuantity = 0;
cart.forEach((item) => {
  cartQuantity += item.quantity;
});
document.querySelector(".cart-quantity").innerText = cartQuantity;

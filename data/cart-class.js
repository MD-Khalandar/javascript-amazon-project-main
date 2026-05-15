class Cart {
  cartItems;
  localStorageKey;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }
  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    return cartQuantity;
  }
  addToCart(productId, quantity = 1) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: productId,
        quantity: quantity,
        deliveryOptionId: 1,
      });
    }
    this.saveToLocalStorage();
  }
  UpdateCartQuantityDisplay() {
    let cartQuantity = this.calculateCartQuantity();
    document.querySelector(".cart-quantity").innerText = cartQuantity;
  }
  removeFromCart(productId) {
    let newCart = [];
    this.cartItems.forEach((item) => {
      if (item.id !== productId) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  updateCartItemDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }
  loadFromLocalStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }
}

const cart = new Cart("cart-oop");
const buisnessCart = new Cart("cart-buisness");

console.log(cart);
console.log(buisnessCart);

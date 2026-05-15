function Cart(localStorageKey) {
  let cart = {
    cartItems: undefined,
    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });

      return cartQuantity;
    },
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
    },
    UpdateCartQuantityDisplay() {
      let cartQuantity = this.calculateCartQuantity();
      document.querySelector(".cart-quantity").innerText = cartQuantity;
    },
    removeFromCart(productId) {
      let newCart = [];
      this.cartItems.forEach((item) => {
        if (item.id !== productId) {
          newCart.push(item);
        }
      });
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    updateCartItemDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (item.id === productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
const buisnessCart = Cart("business-cart-oop");
cart.loadFromLocalStorage();
buisnessCart.loadFromLocalStorage();

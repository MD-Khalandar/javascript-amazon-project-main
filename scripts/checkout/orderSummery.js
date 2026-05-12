import {
  cart,
  removeFromCart,
  saveToLocalStorage,
  updateCartItemDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
export function renderCheckout() {
  let checkoutHtml = "";
  let dateString = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.id;
    const deliveryOptionId = cartItem.deliveryOptionId;
    const today = dayjs();
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        const deleveryDate = today.add(option.deleveryDays, "day");
        dateString = deleveryDate.format("dddd, MMMM D");
      }
    });
    products.forEach((product) => {
      if (product.id === productId) {
        checkoutHtml += `
                <div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">Delivery date: ${dateString}</div>

                <div class="cart-item-details-grid">
                  <img
                    class="product-image"
                    src="${product.image}"
                  />

                  <div class="cart-item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">$${formatCurrency(product.priceCents)}</div>
                    <div class="product-quantity">
                      <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary 
                      js-delete-link" data-product-id="${product.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHtml(product.id, cartItem)}
                  </div>
                </div>
              </div>
                `;
      }
    });
  });
  document.querySelector(".js-order-summary").innerHTML = checkoutHtml;
  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.remove();
    });
  });

  function deliveryOptionsHtml(productId, cartItem) {
    let html = "";
    const today = dayjs();
    deliveryOptions.forEach((option) => {
      const isChecked = cartItem.deliveryOptionId === option.id;
      const deleveryDate = today.add(option.deleveryDays, "day");
      const dateString = deleveryDate.format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(option.priceCents)} - Shipping`;
      html += ` <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
                      <input
                        type="radio"
                        ${isChecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${productId}"
                      />
                      <div>
                        <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price">${priceString}</div>
                      </div>
                    </div>`;
    });
    return html;
  }
  document.querySelectorAll(".js-delivery-option").forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      const productId = optionElement.dataset.productId;
      const deliveryOptionId = optionElement.dataset.deliveryOptionId;
      updateCartItemDeliveryOption(productId, parseInt(deliveryOptionId));
      renderCheckout();
    });
  });
}
renderCheckout();

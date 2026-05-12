import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../../utils/money.js";
export function renderPaymentSummary() {
  let productPricecents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.id;
    const product = getProduct(productId);
    productPricecents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPricecents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">${formatCurrency(productPricecents)} </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;
}

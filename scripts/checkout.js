import { renderCheckout } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
//import "../data/cart-class.js";
loadProducts(() => {
  renderPaymentSummary();
  renderCheckout();
  renderCheckoutHeader();
});

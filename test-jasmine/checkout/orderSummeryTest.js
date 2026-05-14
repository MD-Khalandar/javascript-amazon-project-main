import { renderCheckout as renderOrderSummary } from "../../scripts/checkout/orderSummery.js";
import { loadFromLocalStorage, cart } from "../../data/cart.js";
describe("test suite:renderOrderSummery", () => {
  let proid = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-checkout-header-middle-section"></div>
        `;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    spyOn(localStorage, "setItem");
    loadFromLocalStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1,
    );

    expect(
      document.querySelector(`.js-product-quantity-${proid}`).innerText,
    ).toContain("Quantity: 1");
  });
  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${proid}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      0,
    );
    expect(document.querySelector(`.js-cart-item-container-${proid}`)).toEqual(
      null,
    );
    expect(cart.length).toEqual(0);
  });
});

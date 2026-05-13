import { formatCurrency } from "../utils/money.js";
console.log(formatCurrency(1234.56)); // Output: $1,234.56
describe("test suite: Format Currency", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(199.5)).toEqual("2.00");
  });
});

export const deliveryOptions = [
  {
    id: 1,
    deleveryDays: 7,
    priceCents: 0,
  },
  {
    id: 2,
    deleveryDays: 3,
    priceCents: 499,
  },
  {
    id: 3,
    deleveryDays: 1,
    priceCents: 999,
  },
];
export function getDeliveryOption(deliveryOptionId) {
  let matchingOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  });
  return matchingOption;
}

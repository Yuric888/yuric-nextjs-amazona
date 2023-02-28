const FORRMATED_CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatedCurrency = (value: number) => {
  return FORRMATED_CURRENCY.format(value);
};

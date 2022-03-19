export const parseToCurrency = (data: number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(data);
};

export const parseCurrencyToFloat = (data: string) => {
  return parseFloat(data.replaceAll(".", "").replace(",", "."));
};

export const dateFormat = (data: string) => {
  return new Intl.DateTimeFormat("pt-br").format(new Date(data));
};

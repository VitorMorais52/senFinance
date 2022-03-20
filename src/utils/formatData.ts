export const parseToCurrency = (data: number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(data);
};

export const parseCurrencyToFloat = (data: string) => {
  return parseFloat(data.replaceAll(".", "").replace(",", "."));
};

export const dateFormatToShow = (data: string) => {
  //dd/MM/yyyy
  return new Intl.DateTimeFormat("pt-br").format(new Date(data));
};

export const dateFormatToCompare = (data: string) => {
  //MM-dd-yyyy
  const dateFragmented = data.split("-").reverse();
  const dateFormatted = [
    dateFragmented[1],
    dateFragmented[0],
    dateFragmented[2],
  ].join("-");
  return dateFormatted;
};

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
  const date = dateUniversalFormat(data);
  return new Intl.DateTimeFormat("pt-br").format(date);
};

export const dateUniversalFormat = (data: string): Date => {
  const [year, month, day] = data.split("-");
  const dateFormatted = [year, month, day].join("-");

  return new Date(dateFormatted + " 00:00");
};

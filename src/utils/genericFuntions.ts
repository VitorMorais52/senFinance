export const getDate = () => {
  // yyyy-MM-dd
  const date = new Date();
  const currentDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");
  return currentDate;
};

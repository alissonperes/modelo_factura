const lang = navigator.language || navigator.userLanguage;

const formatter = new Intl.NumberFormat(lang, {
  style: "currency",
  currency: "EUR"
});

export default formatter;

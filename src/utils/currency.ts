const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// USD es la convención de esta demo. No convertimos ni multiplicamos
// los valores recibidos de DummyJSON y conservamos sus centavos.
export const formatCurrency = (value: number): string =>
  formatter.format(value);

const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

/** Formatea pesos chilenos sin decimales. */
export const formatCurrency = (value: number): string =>
  formatter.format(value);

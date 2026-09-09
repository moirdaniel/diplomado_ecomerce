import type { PaymentMethod } from "../types/Payment";

// Record obliga a definir una etiqueta para cada PaymentMethod.
// El formulario y la boleta comparten estos textos para no duplicarlos.
export const paymentLabels: Record<PaymentMethod, string> = {
  "credit-card": "Tarjeta de crédito",
  "debit-card": "Tarjeta de débito",
  webpay: "Webpay",
};

// Este arreglo determina el orden de las opciones del formulario.
export const paymentMethods: PaymentMethod[] = [
  "credit-card",
  "debit-card",
  "webpay",
];

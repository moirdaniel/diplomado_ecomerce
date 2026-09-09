// Los identificadores se usan en el código; sus textos en español
// están centralizados en data/payments.ts. No contienen datos bancarios.
export type PaymentMethod = "credit-card" | "debit-card" | "webpay";
// rejected forma parte del modelo, aunque la demo solo simula aprobaciones.
export type PaymentStatus = "pending" | "approved" | "rejected";

// El pago se asocia a una compra por su importe y método seleccionado.
// Es información local de demostración, no una respuesta de un banco.
export interface Payment {
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
}

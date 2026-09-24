import type { PaymentStatus as Status } from "../../types/Payment";

// Convertimos el estado del pago en un mensaje para la persona que compra.
// Este componente solo informa: no procesa ni aprueba pagos.
const messages: Record<Status, string> = {
  pending: "Procesando pago simulado…",
  approved: "Pago simulado aprobado",
  rejected: "Pago simulado rechazado",
};

export function PaymentStatus({ status }: { status: Status }) {
  return (
    <p className="payment-status" role="status">
      {messages[status]}
    </p>
  );
}

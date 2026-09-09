import type { PaymentStatus as Status } from "../../types/Payment";

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

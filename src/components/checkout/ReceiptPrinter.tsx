import { useEffect, useState } from "react";
import type {
  Order,
  OrderStatus,
  ReceiptPrinterStage,
} from "../../types/Order";
import type { Payment } from "../../types/Payment";
import { paymentLabels } from "../../data/payments";
import { Button } from "../common/Button";
import { PaymentStatus } from "./PaymentStatus";
import { Receipt } from "./receipt/Receipt";
import { ReceiptHeader } from "./receipt/ReceiptHeader";
import { ReceiptItem } from "./receipt/ReceiptItem";
import { ReceiptTotals } from "./receipt/ReceiptTotals";

const orderStatuses: Record<ReceiptPrinterStage, OrderStatus> = {
  processing: "processing",
  printing: "printing",
  complete: "completed",
};

interface ReceiptPrinterProps {
  order: Order;
  payment: Payment;
  onComplete: () => void;
}

/** Secuencia local de demostración; ambos temporizadores se limpian al desmontar. */
export function ReceiptPrinter({
  order,
  payment,
  onComplete,
}: ReceiptPrinterProps) {
  const [stage, setStage] = useState<ReceiptPrinterStage>("processing");

  useEffect(() => {
    
    const printingTimer = window.setTimeout(() => setStage("printing"), 1200);
    const completeTimer = window.setTimeout(() => setStage("complete"), 3200);
    
    // Si se desmonta el componente, cancelamos los cambios pendientes.
    // Esto también permite montarlo de nuevo sin temporizadores sobrantes.
    return () => {
      window.clearTimeout(printingTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  // Una sola etapa controla mensaje, animación y estados visibles.
  // La aprobación es parte de la demo: aquí no se contacta una pasarela.
  const currentOrder: Order = { ...order, status: orderStatuses[stage] };
  
  const currentPayment: Payment = {
    ...payment,
    status: stage === "processing" ? "pending" : "approved",
  };
  
  const message =
    stage === "processing"
      ? "Procesando tu compra"
      : stage === "printing"
        ? "Imprimiendo tu boleta"
        : "¡Compra completada!";

  return (
    <section className="purchase-result" aria-busy={stage !== "complete"}>
      <h1 aria-live="polite">{message}</h1>
      <PaymentStatus status={currentPayment.status} />
      <ol className="printer-steps" aria-label="Progreso de compra">
        <li aria-current={stage === "processing" ? "step" : undefined}>
          1. Procesamiento
        </li>
        <li aria-current={stage === "printing" ? "step" : undefined}>
          2. Impresión
        </li>
        <li aria-current={stage === "complete" ? "step" : undefined}>
          3. Completado
        </li>
      </ol>
      <div className={`printer printer--${stage}`}>
        <div className="printer-machine">
          <span>MOIR GAMES</span>
          <span className="printer-light" />
          <div className="printer-slot" />
        </div>
        <div className="paper-output" aria-hidden={stage === "processing"}>
          {/* Receipt aporta el papel; sus hijos construyen el comprobante. */}
          <Receipt>
            <ReceiptHeader order={currentOrder} />
            {currentOrder.items.map((item) => (
              <ReceiptItem key={item.productId} item={item} />
            ))}
            <ReceiptTotals order={currentOrder} />
            <div className="receipt-payment">
              <p>
                MEDIO DE PAGO
                <br />
                {paymentLabels[currentPayment.method]}
              </p>
              <time dateTime={currentOrder.createdAt.toISOString()}>
                {currentOrder.createdAt.toLocaleString("es-CL")}
              </time>
            </div>
            <p className="receipt-thanks">
              ¡Gracias por comprar!
              <br />
              <strong>GAME ON</strong>
            </p>
          </Receipt>
        </div>
      </div>
      {stage === "complete" && (
        <div className="completion-actions">
          <Button onClick={onComplete}>Volver a comprar</Button>
          <Button variant="secondary" onClick={() => window.print()}>
            Imprimir boleta
          </Button>
        </div>
      )}
    </section>
  );
}

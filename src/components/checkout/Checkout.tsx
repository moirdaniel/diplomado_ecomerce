import { useState } from "react";
import type { CartItem } from "../../types/Cart";
import type { PaymentMethod } from "../../types/Payment";
import { paymentLabels, paymentMethods } from "../../data/payments";
import { calculateIncludedTax, getProductPrice } from "../../utils/order";
import { Button } from "../common/Button";
import { CheckoutSummary } from "./CheckoutSummary";
import { ReceiptTotals } from "./receipt/ReceiptTotals";
import "./checkout.css";

interface CheckoutProps {
  items: CartItem[];
  onConfirm: (method: PaymentMethod) => void;
  onBack: () => void;
}

export function Checkout({ items, onConfirm, onBack }: CheckoutProps) {

  // El formulario solo recoge la elección;
  // CheckoutPage crea la orden
  // cuando recibe onConfirm.
  const [method, setMethod] = useState<PaymentMethod>("webpay");

  const total = items.reduce(
    (sum, item) => sum + getProductPrice(item.product) * item.quantity,
    0,
  );

  return (
    <>
      <Button variant="secondary" onClick={onBack}>
        Volver al catálogo
      </Button>
      <h1>Finaliza tu compra</h1>
      <p className="page-description">
        Revisa tus productos y elige un medio de pago.
      </p>
      <div className="checkout-layout">
        <CheckoutSummary items={items} />
        <form
          className="panel"
          onSubmit={(event) => {
            event.preventDefault();
            if (items.length) onConfirm(method);
          }}
        >
          <h2>Totales</h2>
          <ReceiptTotals order={calculateIncludedTax(total)} />
          <fieldset>
            <legend>Método de pago</legend>
            {paymentMethods.map((value) => (
              <label className="payment-option" key={value}>
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={method === value}
                  onChange={() => setMethod(value)}
                />
                {paymentLabels[value]}
              </label>
            ))}
          </fieldset>
          <p className="muted">
            No se solicitan datos bancarios ni se realizan cobros.
          </p>
          <Button
            type="submit"
            className="full-width"
            disabled={items.length === 0}
          >
            Confirmar compra
          </Button>
        </form>
      </div>
    </>
  );
}

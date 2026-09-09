import { useState } from "react";
import type { CartController } from "../hooks/useCart";
import type { Order } from "../types/Order";
import type { Payment, PaymentMethod } from "../types/Payment";
import { createOrder } from "../utils/order";
import { Checkout } from "../components/checkout/Checkout";
import { ReceiptPrinter } from "../components/checkout/ReceiptPrinter";

interface CheckoutPageProps {
  cart: CartController;
  onBack: () => void;
  onBusy: (busy: boolean) => void;
}

export function CheckoutPage({ cart, onBack, onBusy }: CheckoutPageProps) {
  const [purchase, setPurchase] = useState<{
    order: Order;
    payment: Payment;
  } | null>(null);

  const confirmPurchase = (method: PaymentMethod) => {

    if (purchase || cart.items.length === 0)
      return;

    // Creamos una copia de la compra antes de imprimir. Así la boleta
    // conserva sus precios y cantidades aunque luego vaciemos el carrito.
    const order = createOrder(cart.items);

    const payment: Payment = { method, amount: order.total, status: "pending" };

    setPurchase({ order, payment });
    // Durante la simulación bloqueamos la navegación de la cabecera.
    onBusy(true);
  };

  // Esta acción corresponde a «Volver a comprar»: limpia la compra
  // anterior y regresa al catálogo para comenzar otra.
  const finishPurchase = () => {
    cart.clearCart();
    onBusy(false);
    onBack();
  };

  return purchase ? (
    <ReceiptPrinter
      order={purchase.order}
      payment={purchase.payment}
      onComplete={finishPurchase}
    />
  ) : (
    <Checkout items={cart.items} onConfirm={confirmPurchase} onBack={onBack} />
  );
}

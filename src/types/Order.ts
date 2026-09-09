// Al confirmar, copiamos los datos necesarios del producto a esta línea.
// Su subtotal es precio unitario por cantidad, con IVA incluido.
export interface OrderItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

// La orden describe el estado de la compra; ReceiptPrinterStage describe
// la etapa visual de la impresora. ReceiptPrinter relaciona ambos valores.
export type OrderStatus = "pending" | "processing" | "printing" | "completed";
export type ReceiptPrinterStage = "processing" | "printing" | "complete";

/** Snapshot independiente del carrito. Subtotal es el neto sin IVA. */
export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

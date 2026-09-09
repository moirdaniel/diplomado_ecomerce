export type Platform =
  "PlayStation 5" | "Xbox Series" | "Nintendo Switch" | "PC" | "Retro";

// sale es opcional: si no existe, getProductPrice utiliza regular.
// Ambos importes son números en pesos, sin símbolos ni separadores.
export interface ProductPrice {
  regular: number;
  sale?: number;
}

/** Producto mock: precios finales en pesos chilenos, con IVA incluido. */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: ProductPrice;
  image: string;
  /** Permite mostrar portadas oscuras y fotos de producto sin recortarlas. */
  imagePresentation?: "artwork" | "product";
  platform: Platform;
  // Relaciona el producto con una entrada de data/categories.ts.
  categoryId: number;
  // Límite por carrito en esta demo; no hay inventario compartido entre compras.
  stock: number;
  // Solo los productos marcados aparecen también en destacados.
  featured?: boolean;
}

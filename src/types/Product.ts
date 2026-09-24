export type Platform =
  "PlayStation 5" | "Xbox Series" | "Nintendo Switch" | "PC" | "Retro";

// sale es opcional: si no existe, getProductPrice utiliza regular.
// Los importes conservan los valores de la fuente, sin símbolos ni separadores.
export interface ProductPrice {
  regular: number;
  sale?: number;
}

/** Producto utilizado por la interfaz; la respuesta de la API se adapta en services/products. */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: ProductPrice;
  image: string;
  /** Permite mostrar portadas oscuras y fotos de producto sin recortarlas. */
  imagePresentation?: "artwork" | "product";
  platform?: Platform;
  // Relaciona el producto con una entrada de data/categories.ts.
  categoryId?: number;
  // Nombre visible de la categoría, incluido en los datos de cada producto.
  category: string;
  // Límite por carrito en esta demo; no hay inventario compartido entre compras.
  stock: number;
  // Solo los productos marcados aparecen también en destacados.
  featured?: boolean;
}

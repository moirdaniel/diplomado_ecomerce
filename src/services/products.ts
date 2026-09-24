import type { Product } from "../types/Product";

export const PRODUCTS_URL = "https://dummyjson.com/products";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// La respuesta de la red no está garantizada por TypeScript. Comprobamos
// los campos que utiliza la tienda antes de convertirlos al modelo de la interfaz.
export function parseProductsResponse(value: unknown): {
  products: Product[];
  total: number;
} {
  if (
    !isRecord(value) ||
    !Array.isArray(value.products) ||
    typeof value.total !== "number" ||
    !Number.isInteger(value.total) ||
    value.total < value.products.length
  ) {
    throw new Error("La API devolvió un formato de catálogo inesperado.");
  }
  const ids = new Set<number>();
  const products = value.products.map((item: unknown): Product => {
    if (
      !isRecord(item) ||
      typeof item.id !== "number" ||
      !Number.isInteger(item.id) ||
      ids.has(item.id) ||
      typeof item.title !== "string" ||
      !item.title.trim() ||
      typeof item.category !== "string" ||
      !item.category.trim() ||
      typeof item.price !== "number" ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      typeof item.stock !== "number" ||
      !Number.isInteger(item.stock) ||
      item.stock < 0 ||
      typeof item.thumbnail !== "string" ||
      !/^https?:\/\//.test(item.thumbnail)
    ) {
      throw new Error("La API devolvió un producto con datos incompletos.");
    }
    ids.add(item.id);
    return {
      id: item.id,
      name: item.title,
      description: typeof item.description === "string" ? item.description : "",
      category: item.category,
      price: { regular: item.price },
      stock: item.stock,
      image: item.thumbnail,
    };
  });
  return { products, total: value.total };
}

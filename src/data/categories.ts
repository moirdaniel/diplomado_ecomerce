import type { Category } from "../types/Category";

// Los IDs conectan estas categorías con categoryId de cada producto.
// Cambiar un ID requiere actualizar también los productos que lo utilizan.
export const categories: Category[] = [
  { id: 1, name: "PlayStation", slug: "playstation" },
  { id: 2, name: "Xbox", slug: "xbox" },
  { id: 3, name: "Nintendo", slug: "nintendo" },
  { id: 4, name: "PC Gaming", slug: "pc" },
  { id: 5, name: "Retro Gaming", slug: "retro" },
  { id: 6, name: "Accesorios", slug: "accesorios" },
];

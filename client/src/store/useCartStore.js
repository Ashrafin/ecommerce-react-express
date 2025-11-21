import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      const updated = items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return set({ items: updated });
    }

    set({ items: [...items, { ...product, quantity: 1 }] });
  },
  removeItem: (id) => {
    set({
      items: get().items.filter(item => item.id !== id)
    });
  },
  updateQuantity: (id, quantity) => {
    const updated = get().items.map(item => item.id === id ? { ...item, quantity: quantity } : item);
    set({ items: updated });
  },
  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  totalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  clearCart: () => set({ items: [] })
}));
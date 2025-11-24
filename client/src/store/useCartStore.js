import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  showNotification: false,
  notificationMessage: "",

  triggerNotification: (message) => {
    set({ showNotification: true, notificationMessage: message });
    setTimeout(() => {
      set({ showNotification: false });
    }, 5000);
  },

  addItem: (product) => {
    const { items, triggerNotification } = get();
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      const updated = items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      set({ items: updated });
      triggerNotification(`${product.title} quantity increased`);
      return;
    }

    set({ items: [...items, { ...product, quantity: 1 }] });
    triggerNotification(`${product.title} added to cart`);
  },
  removeItem: (id) => {
    const { items, triggerNotification } = get();
    const item = items.find(item => item.id === id);

    if (!item) return;

    set({ items: items.filter(item => item.id !== id) });
    triggerNotification(`${item.title} removed from cart`);
  },
  updateQuantity: (id, newQuantity) => {
    const { items, triggerNotification } = get();
    const item = items.find(item => item.id === id);

    if (!item) return;

    if (newQuantity <= 0) {
      set({ items: items.filter(item => item.id !== id) });
      triggerNotification(`${item.title} removed from cart`);
      return;
    }

    const updated = items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
    set({ items: updated });
    triggerNotification(`${item.title} updated to ${newQuantity}`);
  },
  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  totalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  clearCart: () => {
    const { items, triggerNotification } = get();

    if (items.length === 0) return;

    set({ items: [] });
    triggerNotification("Cart cleared");
  }
}));
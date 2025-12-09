import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  showNotification: false,
  notificationMessage: "",
  notificationId: null,
  notificationQueue: [],
  timeoutId: null,

  triggerNotification: (message) => {
    const { showNotification, notificationQueue } = get();
    const id = Date.now() + Math.random();

    if (showNotification) {
      set({
        notificationQueue: [...notificationQueue, { id, message }]
      });
    } else {
      set({
        showNotification: true,
        notificationMessage: message,
        notificationId: id
      });
      const timeoutId = setTimeout(() => {
        get().hideNotification();
      }, 5000);
      set({ timeoutId });
    }
  },
  hideNotification: () => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    set({
      showNotification: false,
      timeoutId: null
    });
  },
  processQueue: () => {
    const { notificationQueue } = get();

    if (notificationQueue.length > 0) {
      const [next, ...remainingQueue] = notificationQueue;
      set({
        notificationQueue: remainingQueue,
        showNotification: true,
        notificationMessage: next.message,
        notificationId: next.id
      });
      const timeoutId = setTimeout(() => {
        get().hideNotification();
      }, 5000);
      set({ timeoutId });
    }
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
    triggerNotification(`${item.title} updated to ${newQuantity} `);
  },
  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  totalPrice: () => {
    const { items } = get();

    if (items.length > 0) {
      return items.reduce((sum, item) => {
        const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
        const finalPrice = hasDiscount
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;

        return sum + finalPrice * item.quantity;
      }, 0);
    }
  },
  clearCart: () => {
    const { items, triggerNotification } = get();

    if (items.length === 0) return;

    set({ items: [] });
    triggerNotification("Cart cleared");
  }
}));
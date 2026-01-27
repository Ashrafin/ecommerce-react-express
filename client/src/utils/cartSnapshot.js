const SNAPSHOT_KEY = "ecom.cart.v1";

export const saveCartSnapshot = (cartItems) => {
  if (!cartItems || !Array.isArray(cartItems)) return;

  const refinedItems = cartItems.map(item => ({
    productId: item.productId || item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
    discount: item.discountPercentage || item.discount,
    quantity: item.quantity
  }));

  const snapshot = {
    items: refinedItems,
    updatedAt: Date.now()
  };

  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.error("Failed to save cart snapshot:", error);
  }
};

export const loadCartSnapshot = () => {
  try {
    const json = localStorage.getItem(SNAPSHOT_KEY);
    if (!json) return null;

    const snapshot = JSON.parse(json);

    if (snapshot && Array.isArray(snapshot.items)) {
      return snapshot;
    }

    return null;
  } catch (error) {
    console.error("Failed to load cart snapshot:", error);
    return null;
  }
};

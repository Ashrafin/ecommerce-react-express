const STORAGE_KEY = "recentlyViewedProducts";
const MAX_ITEMS = 10;

export const addToRecentlyViewedProducts = (product) => {
  if (!product || !product.id) return;

  const stored = getRecentlyViewedProducts();

  const itemToStore = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    tags: product.tags,
    discountPercentage: product.discountPercentage
  };

  const withoutNew = stored.filter(item => item.id !== product.id);
  const updated = [itemToStore, ...withoutNew].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getRecentlyViewedProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing recently viewed products", error);
    return [];
  }
};

export const clearRecentlyViewedProducts = () => {
  localStorage.removeItem(STORAGE_KEY);
};
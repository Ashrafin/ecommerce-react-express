const STORAGE_KEY = "topTagViewCounts";
const MAX_ITEMS = 30;

export const trackProductTags = (tags) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) return;

  const stored = getTopTags(MAX_ITEMS);
  const tagMap = new Map();

  stored.forEach(item => {
    tagMap.set(item.tag, item.count);
  });

  tags.forEach(tag => {
    const currentCount = tagMap.get(tag) || 0;
    tagMap.set(tag, currentCount + 1);
  });

  const sortedTags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  const topTags = sortedTags.slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(topTags));
};

export const getTopTags = (limit = 30) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.slice(0, limit);
  } catch (error) {
    console.error("Error parsing top tags", error);
    return [];
  }
};

export const clearTopTags = () => {
  localStorage.removeItem(STORAGE_KEY);
};
// favorites.js
const FAVORITES_KEY = "favorites";

// Get saved favorites
export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

// Save favorites
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Add favorite
export function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.find(b => b.id === book.id)) {
    favorites.push(book);
    saveFavorites(favorites);
  }
}

// Remove favorite
export function removeFavorite(bookId) {
  let favorites = getFavorites();
  favorites = favorites.filter(b => b.id !== bookId);
  saveFavorites(favorites);
}
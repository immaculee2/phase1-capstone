import { getFavorites, removeFavorite } from './favorites.js';

const favoritesGrid = document.getElementById('favorites-grid');

function renderFavorites() {
  const favorites = getFavorites();
  favoritesGrid.innerHTML = "";

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `<p class="text-gray-600 col-span-full">No favorite books yet.</p>`;
    return;
  }

  favorites.forEach(book => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    card.innerHTML = `
      <img src="${book.cover || 'https://via.placeholder.com/150x220'}" alt="${book.title}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h4 class="font-bold text-lg mb-1">${book.title}</h4>
        <p class="text-gray-600 text-sm">${book.author}</p>
        <button class="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-id="${book.id}">Remove</button>
      </div>
    `;

    const removeBtn = card.querySelector('button');
    removeBtn.addEventListener('click', () => {
      removeFavorite(book.id);
      renderFavorites();
    });

    favoritesGrid.appendChild(card);
  });
}

// Initial render
renderFavorites();
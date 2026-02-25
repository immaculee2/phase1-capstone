import { getBooks } from "./fetchbook.js";
import { addFavorite } from "./";

const booksGrid = document.getElementById('books-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const statusMessage = document.getElementById('status-message');

function renderBooks(books) {
  booksGrid.innerHTML = "";

  if (books.length === 0) {
    statusMessage.textContent = "No results found.";
    return;
  }

  statusMessage.textContent = "";

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h4 class="font-bold text-lg mb-1">${book.title}</h4>
        <p class="text-gray-600 text-sm">${book.author}</p>
        <button class="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Add to Favorites
        </button>
      </div>
    `;

    const addBtn = card.querySelector('button');
    addBtn.addEventListener('click', () => {
      addFavorite(book);
      alert(`${book.title} added to favorites!`);
    });

    booksGrid.appendChild(card);
  });
}

// Initial load
async function loadBooks() {
  statusMessage.textContent = "Loading...";
  const books = await getBooks();
  renderBooks(books);
}

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;
  statusMessage.textContent = "Searching...";
  const books = await getBooks(query);
  renderBooks(books);
});

loadBooks();
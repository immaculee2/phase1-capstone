export async function getBooks(query = "") {
  try {
    const url = query
      ? `https://gutendex.com/books?search=${query}`
      : `https://gutendex.com/books`;   // returns many books

    const response = await fetch(url);
    const data = await response.json();

    return data.results.map(book => ({
      id: book.id,
      title: book.title,
      author: book.authors.length ? book.authors[0].name : "Unknown",
      cover: book.formats["image/jpeg"] 
        ? book.formats["image/jpeg"]
        : "https://via.placeholder.com/150x220"
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
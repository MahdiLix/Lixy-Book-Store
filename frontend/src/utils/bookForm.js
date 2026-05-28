export function createEmptyBookForm(book = {}) {
  return {
    title: book.title || "",
    author: book.author || "",
    publishedYear: book.publishedYear ? String(book.publishedYear) : "",
    genre: book.genre || "",
    availableCopies:
      book.availableCopies !== undefined && book.availableCopies !== null
        ? String(book.availableCopies)
        : "1",
  };
}

export function buildBookPayload(bookForm) {
  const payload = {
    title: bookForm.title.trim(),
    author: bookForm.author.trim(),
  };

  if (bookForm.publishedYear.trim()) {
    payload.publishedYear = Number(bookForm.publishedYear);
  }

  if (bookForm.genre) {
    payload.genre = bookForm.genre;
  }

  if (bookForm.availableCopies !== "") {
    payload.availableCopies = Number(bookForm.availableCopies);
  }

  return payload;
}
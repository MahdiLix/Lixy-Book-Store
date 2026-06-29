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
    // Carries the existing DB image URL into the form so BookImagePicker
    // can preview it on the Edit page (not sent back as a field itself —
    // the file upload, if any, replaces it).
    bookImage: book.bookImage || "",
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
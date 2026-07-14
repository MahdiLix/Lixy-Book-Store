export function createEmptyBookForm(book = {}) {
  return {
    title: book.title || "",
    author: book.author || "",
    publishedYear: book.publishedYear ? String(book.publishedYear) : "",
    genre: book.genre || "",
    stockQuantity:
      book.stockQuantity !== undefined && book.stockQuantity !== null
        ? String(book.stockQuantity)
        : "1",
    price:
      book.price !== undefined && book.price !== null
        ? String(book.price)
        : "1",
    discount:
      book.discount !== undefined && book.discount !== null
        ? String(book.discount)
        : "0",

    //  Calculate remaining hours if editing an existing book
    discountHours: book.discountEndDate
      ? String(
          Math.max(
            1,
            Math.round(
              (new Date(book.discountEndDate).getTime() - Date.now()) /
                (1000 * 60 * 60),
            ),
          ),
        )
      : "",
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

  if (bookForm.stockQuantity !== "") {
    payload.stockQuantity = Number(bookForm.stockQuantity);
  }

  if (bookForm.price !== "") {
    payload.price = Number(bookForm.price);
  }

  if (bookForm.discount !== "") {
    payload.discount = Number(bookForm.discount);
  }

  // onvert frontend hours to a real Date for the backend
  if (Number(bookForm.discount) > 0 && bookForm.discountHours) {
    payload.discountEndDate = new Date(
      Date.now() + Number(bookForm.discountHours) * 60 * 60 * 1000,
    );
  }

  return payload;
}


// GET ALL BOOK BY QUERY
export async function fetchBooks(term = "") {
  const url = `/api/books?q=${encodeURIComponent(term)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }

  const result = await res.json();
  return result.data || [];
}


// GET BOOK BY ID FOR UPDATE
export async function fetchBookById(id) {
  const res = await fetch(`/api/books/${id}`);

  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }

  const result = await res.json();
  return result.data;
}


// ADD A NEW BOOK TO DB
export async function addBook(bookData, authHeader) {
  const res = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(bookData),
  });

  const data = await res.json();

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(data.message || `Server Error ${res.status}`);
  }
 console.log("from api:", data.book)
  return data 
}


// UPDATE BOOK BY ID
export async function updateBook(id, bookData, authHeader) {
  const res = await fetch(`/api/books/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(bookData),
  });

  const data = await res.json();

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(data.message || `Server Error ${res.status}`);
  }

  return data;
}


// REMOVE BOOK BY ID
export async function deleteBook(id, authHeader) {
  const res = await fetch(`/api/books/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });

  const data = await res.json();

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(data.message || `Server Error ${res.status}`);
  }

  return data;
}
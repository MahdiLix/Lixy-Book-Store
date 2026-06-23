export async function fetchBooks({
  searchTerm = "",
  page = 1,
  limit = 10,
  latest = false,
} = {}) {

  const params = new URLSearchParams();
  
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (latest) params.set("latest", String(latest));

  const url = `/api/books${params.toString() ? `?${params.toString()}` : ""}`;
  console.log('URL FROM BOOKS API', url)


  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }

  const result = await res.json();

  return {
    books: result.data || [],
    pagination: result.pagination || null,
  };
}

export async function fetchBookById(id) {
  const res = await fetch(`/api/books/${id}`);
  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }
  const result = await res.json();
  return result.data;
}

export async function addBook(bookData, authHeader) {
  const res = await fetch("/api/books/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(bookData),
  });

  const data = await res.json();

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

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

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function deleteBook(id, authHeader) {
  const res = await fetch(`/api/books/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });

  const data = await res.json();

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

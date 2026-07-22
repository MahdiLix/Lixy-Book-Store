const BASE_URL = "/api/books";

export async function fetchBooks({
  searchTerm = "",
  genre = "",
  page = 1,
  limit = 12,
  latest = false,
  top = false,
  mustOffer = false,
} = {}) {
  const params = new URLSearchParams();

  if (searchTerm) params.set("searchTerm", searchTerm);
  if (genre) params.set("genre", genre);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (latest) params.set("latest", String(latest));
  if (top) params.set("top", String(top));
  if (mustOffer) params.set("mustOffer", String(mustOffer));

  const url = `/api/books${params.toString() ? `?${params.toString()}` : ""}`;

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
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Server Error: ${res.status}`);
  }
  const result = await res.json();
  return result.data;
}

export async function addBook(bookData, authHeader) {
  const isFormData = bookData instanceof FormData;

  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: isFormData ? bookData : JSON.stringify(bookData),
  });

  const data = await res.json();

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function updateBook(id, bookData, authHeader) {
  const isFormData = bookData instanceof FormData;

  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? bookData : JSON.stringify(bookData),
  });

  const data = await res.json();

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function deleteBook(id, authHeader) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
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

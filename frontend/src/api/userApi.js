const BASE_URL = "/api/user";

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);
  if (!data.token) throw new Error("Login failed: No token received");

  return data;
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function getUserProfile(id, token) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: token },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function updateUserProfile(id, token, payload) {
  console.log('payload for update', payload)
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function updateUserPassword(id, token, payload) {
  const res = await fetch(`${BASE_URL}/password/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      Authorization: token 
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);
  return data;
}

export async function getAllUsers(token) {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: token },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}

export async function deleteUser(id, token) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);

  return data;
}


const BASE_URL = "/api/admin";

export async function getAdminProfile(id, token) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);
  return data;
}

export async function updateAdminProfile(id, token, payload) {
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

export async function updateAdminPassword(id, token, payload) {
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
 
export async function getAllAdmins(token) {
  const res = await fetch(`${BASE_URL}/admins`, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);
  return data;
}

export async function registerAdmin(token, payload) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
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

export async function deleteAdmin(id, token) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server Error ${res.status}`);
  return data;
}

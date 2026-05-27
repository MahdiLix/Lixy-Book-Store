export async function loginAdmin(loginField) {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginField),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Server Error ${res.status}`);
  }

  if (!data.token) {
    throw new Error("Login failed: token not returned");
  }

  return data;
}
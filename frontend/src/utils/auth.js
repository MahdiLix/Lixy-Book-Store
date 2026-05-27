const TOKEN_KEY = "userAuthToken";

export function saveAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? `Bearer ${token}` : "";
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}
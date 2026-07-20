const TOKEN_KEY = "userAuthToken";
const USER_KEY = "userInfo";

export function saveAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? `Bearer ${token}` : "";
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function saveUserInfo(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserInfo() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function getUserRole() {
  const user = getUserInfo();
  return user?.role || "guest";
}

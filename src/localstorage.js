export function setToken(token) {
  const now = new Date();
  const expirationDate = now.setDate(now.getDate() + 5); // set expiration to 7 days from now
  localStorage.setItem(
    "logintoken",
    JSON.stringify({ value: token, expiresAt: expirationDate })
  );
}

export function getToken() {
  const tokenData = JSON.parse(localStorage.getItem("logintoken"));
  if (tokenData && tokenData.expiresAt > Date.now()) {
    return tokenData.value;
  }
  localStorage.removeItem("logintoken");
  return null;
}
export function removeToken() {
  localStorage.removeItem("logintoken");
}

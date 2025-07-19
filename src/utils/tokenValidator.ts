export default function isTokenExpired(token: string) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.exp * 1000 < Date.now(); // exp is in seconds
  } catch (e) {
    return true;
  }
}

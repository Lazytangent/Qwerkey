export default function api(url, method = 'GET', body, isFormData = false) {
  if (!isFormData) {
    return fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } else {
    return fetch(url, {
      method,
      body,
    });
  }
}

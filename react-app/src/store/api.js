import Cookies from 'js-cookie';

export default function api(url, method = 'GET', body, isFormData = false) {
  if (!isFormData) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrf_token'),
      },
      body: JSON.stringify(body),
    });
  } else {
    return fetch(url, {
      method,
      body,
    });
  }
}

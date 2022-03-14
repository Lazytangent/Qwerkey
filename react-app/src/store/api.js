import Cookies from 'js-cookie';

const defaultOptions = { headers: {} };

export default function api(url, options = defaultOptions, isFormData = false) {
  if (!isFormData) {
    return fetch(url, {
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrf_token'),
        ...options.headers,
      },
    });
  } else {
    return fetch(url, {
      method: 'GET',
      ...options,
      headers: {
        'X-CSRFToken': Cookies.get('csrf_token'),
        ...options.headers,
      },
    });
  }
}

import { API_URL, HEADER, HEADER_AUTH } from '../constants';

class Auth {
  private _headers: HeadersInit;
  private _url: RequestInfo;

  constructor(baseURL: string, headers: HeadersInit) {
    (this._headers = headers), (this._url = baseURL);
  }

  async _getResponseDataAuth(res: Response) {
    if (res.status === 201) {
      return await res.json();
    }

    return Promise.reject({
      code: res.status,
      message: `Ошибка при запросе: ${res.status}`
    });
  }

  _encode(parm: string): string {
    return encodeURIComponent(parm);
  }

  login(password: string, email: string) {
    return fetch(`${this._url}/api/auth/jwt/login`, {
      method: 'POST',
      headers: HEADER_AUTH,
      credentials: 'include',
      mode: 'no-cors',
      body: `grant_type=&username=${this._encode(email)}&password=${this._encode(
        password
      )}&scope=&client_id=&client_secret=`
    }).then(() => Promise.resolve());
  }

  logout() {
    return fetch(`${this._url}/api/auth/jwt/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include'
    });
  }

  register(username: string, email: string, password: string) {
    return fetch(`${this._url}/api/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        is_active: true,
        is_superuser: false,
        is_verified: false,
        username,
        email,
        password
      })
    }).then(this._getResponseDataAuth);
  }
}

const auth = new Auth(API_URL, HEADER);

export default auth;

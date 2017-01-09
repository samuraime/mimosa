const STORAGE_KEY = 'authToken';

export class StorageService {
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEY);
  }
  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEY, token);
  }
  removeAuthToken() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

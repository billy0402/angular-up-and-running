import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: Storage = null;

  constructor() {
    this._localStorage = window.localStorage;
  }

  setItem(key, value) {
    this._localStorage.setItem(key, value);
  }

  getItem(key): string {
    return this._localStorage.getItem(key);
  }

  removeItem(key) {
    this._localStorage.removeItem(key);
  }

  clear() {
    this._localStorage.clear();
  }

}

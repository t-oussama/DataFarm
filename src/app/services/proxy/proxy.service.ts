import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private proxyUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getProxyRequestURL(url) {
    return `${this.proxyUrl}?url=${encodeURIComponent(url)}`;
  }

  get(url, headers = {}) {
    return this.http.get(this.getProxyRequestURL(url),
      {headers: headers, responseType: 'text'});
  }

  post(url, headers = {}, data = {}) {
    return this.http.post(this.getProxyRequestURL(url),
      JSON.stringify(data), {headers: headers, responseType: 'text'});
  }

  patch(url, headers = {}, data = {}) {
    return this.http.patch(this.getProxyRequestURL(url),
      JSON.stringify(data), {headers: headers, responseType: 'text'});
  }

  put(url, headers = {}, data = {}) {
    return this.http.put(this.getProxyRequestURL(url),
      JSON.stringify(data), {headers: headers, responseType: 'text'});
  }

  delete(url, headers = {}) {
    return this.http.delete(this.getProxyRequestURL(url),
      {headers: headers, responseType: 'text'});
  }
}

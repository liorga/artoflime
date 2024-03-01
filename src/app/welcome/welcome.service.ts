import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  apiUrl = 'https://art-of-lime-node-3b6c4873349f.herokuapp.com/';

  constructor(public http: HttpClient) {}

  getWelcomeMessage() {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}

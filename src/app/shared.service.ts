import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly http: HttpClient) { }

  getPostsData() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getPostAlbums(): Observable<Model> {
    return this.http.get<Model>('https://jsonplaceholder.typicode.com/albums');
  }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  getProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}

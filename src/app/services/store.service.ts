import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '3', sort = 'desc'): Observable<Array<Product>> {
    const category = 'electronics';
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products/category/${category}?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/electronics`
    );
  }
}

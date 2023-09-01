import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort="desc"): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`)
  }


}

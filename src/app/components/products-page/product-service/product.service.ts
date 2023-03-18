import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListItem } from '../product-model/product.api';
const BASE_URL = 'http://localhost/anyakozosseg-backend/API/';
const COMPONENT_URL = 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public fetchProductsByCategory(
    categoryId: number
  ): Observable<ProductListItem[]> {
    const params: HttpParams = new HttpParams().set('categoryId', categoryId);
    return this.http.get<ProductListItem[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }

  public fetchProductsByFirstLetter(
    firstLetter: string
  ): Observable<ProductListItem[]> {
    const params: HttpParams = new HttpParams().set('abcLetter', firstLetter);
    return this.http.get<ProductListItem[]>(`${BASE_URL}${COMPONENT_URL}`, {
      params,
    });
  }
}
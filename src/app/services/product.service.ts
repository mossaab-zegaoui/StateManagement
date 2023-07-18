import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/prodcut.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly host = 'http://localhost:3000';
  constructor(private htttp: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.htttp.get<Product[]>(`${this.host}/products`);
  }
  addProduct(product: any): Observable<Product> {
    return this.htttp.post<Product>(`${this.host}/products`, product);
  }
  getProduct(id: string | null): Observable<Product> {
    return this.htttp.get<Product>(`${this.host}/products/${id}`);
  }
  deleteProduct(id: string) {
    return this.htttp.delete(`${this.host}/products/${id}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.htttp.put<Product>(
      `${this.host}/products/${product.id}`,
      product
    );
  }
  selectProduct(product: Product): Observable<Product> {
    product.isSelected = !product.isSelected;
    return this.htttp.put<Product>(
      `${this.host}/products/${product.id}`,
      product
    );
  }
  getSelectedProducts(): Observable<Product[]> {
    return this.htttp.get<Product[]>(`${this.host}/products?isSelected=true`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.htttp.get<Product[]>(
      `${this.host}/products?name_like=${keyword}`
    );
  }
}

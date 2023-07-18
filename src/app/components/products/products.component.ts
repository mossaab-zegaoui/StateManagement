import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import {
  AppState,
  ProductAction,
  ProductActionsType,
  ProductState,
} from 'src/app/model/app-state.interface';
import { Product } from 'src/app/model/prodcut.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<AppState<Product[]>> | null = null;

  constructor(private productService: ProductService, private router: Router) {}
  onAction($event: ProductAction) {
    switch ($event.type) {
      case ProductActionsType.GET_ALL_PRODUCTS: {
        this.onGetAllProducts();
        break;
      }
      case ProductActionsType.GET_SELECTED_PRODUCTS: {
        this.onGetSelectedProducts();
        break;
      }
      case ProductActionsType.SELECT_PRODUCT: {
        this.onSelectProduct($event.payload);
        break;
      }
      case ProductActionsType.ADD_NEW_PRODUCT: {
        this.onAddProduct();
        break;
      }
      case ProductActionsType.EDIT_PRODUCT: {
        this.onEditProduct($event.payload);
        break;
      }
      case ProductActionsType.SEARCH_PRODUCTS: {
        this.onSearchProduct($event.payload);
        break;
      }
      case ProductActionsType.DELETE_PRODUCT: {
        this.onDeleteProduct($event.payload);
        break;
      }
    }
  }
  onSearchProduct(keyword: string) {
    this.products$ = this.productService.searchProducts(keyword).pipe(
      map((data) => {
        console.log(data);
        return { state: ProductState.LOADED, data: data };
      }),
      startWith({ state: ProductState.LOADING }),
      catchError((err) =>
        of({
          state: ProductState.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }
  onEditProduct(id: string) {
    this.router.navigate([`products/edit/${id}`]);
  }
  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('product deleted');
        this.onGetAllProducts();
      },
    });
  }
  onAddProduct() {
    this.router.navigate(['products/add']);
  }
  onSelectProduct(product: Product) {
    this.productService.selectProduct(product).subscribe({
      next: (product) => {
        console.log(product);
      },
    });
  }
  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => {
        console.log(data);
        return { state: ProductState.LOADED, data: data };
      }),
      startWith({ state: ProductState.LOADING }),
      catchError((err) =>
        of({
          state: ProductState.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }
  onGetAllProducts() {
    this.products$ = this.productService.getProducts().pipe(
      map((data) => {
        console.log(data);
        return { state: ProductState.LOADED, data: data };
      }),
      startWith({ state: ProductState.LOADING }),
      catchError((err) =>
        of({
          state: ProductState.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ProductAction,
  ProductActionsType,
} from 'src/app/model/app-state.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() eventEmitter: EventEmitter<ProductAction> = new EventEmitter();

  onGetAllProducts() {
    this.eventEmitter.emit({
      type: ProductActionsType.GET_ALL_PRODUCTS,
    });
  }
  onGetSelectedProducts() {
    this.eventEmitter.emit({
      type: ProductActionsType.GET_SELECTED_PRODUCTS,
    });
  }
  onNewProduct() {
    {
      this.eventEmitter.emit({
        type: ProductActionsType.ADD_NEW_PRODUCT,
      });
    }
  }
  onSearch(form: NgForm) {
    this.eventEmitter.emit({
      type: ProductActionsType.SEARCH_PRODUCTS,
      payload: form.value.keyword,
    });
  }
}

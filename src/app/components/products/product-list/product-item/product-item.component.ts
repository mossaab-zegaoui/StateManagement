import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ProductAction,
  ProductActionsType,
} from 'src/app/model/app-state.interface';
import { Product } from 'src/app/model/prodcut.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() eventEmitter: EventEmitter<ProductAction> = new EventEmitter();
  onSelect(product: Product) {
    this.eventEmitter.emit({
      type: ProductActionsType.SELECT_PRODUCT,
      payload: product,
    });
  }
  onDelete(id: string) {
    this.eventEmitter.emit({
      type: ProductActionsType.DELETE_PRODUCT,
      payload: id,
    });
  }
  onEdit(id: string) {
    this.eventEmitter.emit({
      type: ProductActionsType.EDIT_PRODUCT,
      payload: id,
    });
  }
}

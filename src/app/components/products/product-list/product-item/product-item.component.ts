import { Component, Input } from '@angular/core';
import {
  ProductActionsType,
} from 'src/app/model/app-state.interface';
import { Product } from 'src/app/model/prodcut.interface';
import { EventDrivenService } from 'src/app/services/event-driven.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  constructor(private eventService: EventDrivenService) {}
  onSelect(product: Product) {
    this.eventService.publishEvent({
      type: ProductActionsType.SELECT_PRODUCT,
      payload: product,
    });
  }
  onDelete(id: string) {
    this.eventService.publishEvent({
      type: ProductActionsType.DELETE_PRODUCT,
      payload: id,
    });
  }
  onEdit(id: string) {
    this.eventService.publishEvent({
      type: ProductActionsType.EDIT_PRODUCT,
      payload: id,
    });
  }
}

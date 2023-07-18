import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, ProductAction } from 'src/app/model/app-state.interface';
import { Product } from 'src/app/model/prodcut.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() productList$: Observable<AppState<Product[]>> | null = null;
  @Output() eventEmitter: EventEmitter<ProductAction> = new EventEmitter();
  onAction($event: ProductAction) {
    this.eventEmitter.emit($event);
  }
}

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, ProductAction } from 'src/app/model/app-state.interface';
import { Product } from 'src/app/model/prodcut.interface';
import { EventDrivenService } from 'src/app/services/event-driven.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() productList$: Observable<AppState<Product[]>> | null = null;
  constructor(private eventService: EventDrivenService) {}

  onAction($event: ProductAction) {
    this.eventService.publishEvent($event);
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductActionsType } from 'src/app/model/app-state.interface';
import { EventDrivenService } from 'src/app/services/event-driven.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private eventService: EventDrivenService) {}
  onGetAllProducts() {
    this.eventService.publishEvent({
      type: ProductActionsType.GET_ALL_PRODUCTS,
    });
  }
  onGetSelectedProducts() {
    this.eventService.publishEvent({
      type: ProductActionsType.GET_SELECTED_PRODUCTS,
    });
  }
  onNewProduct() {
    {
      this.eventService.publishEvent({
        type: ProductActionsType.ADD_NEW_PRODUCT,
      });
    }
  }
  onSearch(form: NgForm) {
    this.eventService.publishEvent({
      type: ProductActionsType.SEARCH_PRODUCTS,
      payload: form.value.keyword,
    });
  }
}

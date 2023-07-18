import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductAction } from '../model/app-state.interface';

@Injectable({
  providedIn: 'root',
})
export class EventDrivenService {
  eventSubject: Subject<ProductAction> = new Subject();
  eventSubject$ = this.eventSubject.asObservable();

  constructor() {}

  publishEvent(event: ProductAction) {
    this.eventSubject.next(event);
  }
}

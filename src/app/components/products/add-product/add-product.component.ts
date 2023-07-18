import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/prodcut.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  addForm!: FormGroup;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      id: [''],
      name: [''],
      price: [0],
      isSelected: [true],
    });
  }
  onSaveProduct() {
    this.productService
      .addProduct(this.addForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: Product) => {
          this.addForm.reset();
          alert('product added');
          console.log(data);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

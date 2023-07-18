import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/prodcut.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: string | null = null;
  editForm: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    price: [0],
    isSelected: [true],
  });
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.productId);
  }
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  getProduct(id: string | null) {
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.editForm = this.fb.group({
          id: [product.id],
          name: [product.name],
          price: [product.price],
          isSelected: [product.isSelected],
        });
      },
    });
  }
  onUpdateProduct() {
    this.productService.updateProduct(this.editForm.value).subscribe({
      next: (response: Product) => {
        console.log('produced updated');
        console.log(response);
      },
    });
  }
}

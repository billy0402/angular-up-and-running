import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  public productForm: FormGroup;
  public message: string = '';

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      imageUrl: ['', [Validators.required, Validators.pattern('^http(s?)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$')]],
      isOnSale: false
    });
  }

  createProduct() {
    if (this.productForm.invalid) {
      console.error('Product form is in an invalid state');
      this.message = 'Please correct all errors and resubmit the form';
      return;
    }

    console.log('Product From', this.productForm.value);
    const newProduct: Product = this.productForm.value;
    this.productService.createProduct(newProduct);
    this.productForm.reset({name: '', price: 0, imageUrl: ''});
    console.log('Creating product', newProduct);
  }

}

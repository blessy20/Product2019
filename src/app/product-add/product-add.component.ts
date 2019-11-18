import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  isSubmitted = false;
  formProduct: FormGroup;
  product: Product = new Product();

  constructor(private service: ServiceService,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.formProduct = this.formBuilder.group({
      productname: ['', [Validators.required]],
      productdesc: ['', [Validators.required]],
      productmfg: ['', [Validators.required]],
      productprice: ['', [Validators.required]]
    });


  }
  get formControls() {
    return this.formProduct.controls;
  }
  addProduct() {
    this.isSubmitted = true;
    if (this.formProduct.invalid) {
      return;
    }

    this.product.pro_name = this.formProduct.controls.productname.value;
    this.product.pro_desc = this.formProduct.controls.productdesc.value;
    this.product.pro_mfg = this.formProduct.controls.productmfg.value;
    this.product.pro_price = this.formProduct.controls.productprice.value;
    this.service.addProducts(this.product).subscribe();
    this.toastr.success('product details added', '');
  }
}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
 product:Product=new  Product();
 formProduct:FormGroup;

  constructor(private service:ServiceService,private formBuilder:FormBuilder,private route:ActivatedRoute,private toastr:ToastrService) { }
 
  pro_id:number;

  ngOnInit() {
    this.pro_id=this.route.snapshot.params["id"];
    this.service.getProduct(this.pro_id).subscribe(data=>
      {
       this.product=data;
        //forEach(element=>{
      //  this.product=data;
       // this.product.pro_name=element["pro_name"];
       // this.product.pro_desc=element["pro_desc"];
       // this.product.pro_mfg=element["pro_mfg"];
       // this.product.pro_price=element["pro_price"];
      //});
    });

    this.formProduct = this.formBuilder.group({
      pro_id:null,
      pro_name: ['', [Validators.required]],
      pro_desc: ['', [Validators.required]],
      pro_mfg: ['', [Validators.required]],
      pro_price: ['', [Validators.required]]
    });
    
   
  }
  updateProduct() {
   
    this.product.pro_name = this.formProduct.controls.pro_name.value;
    this.product.pro_desc = this.formProduct.controls.pro_desc.value;
    this.product.pro_mfg = this.formProduct.controls.pro_mfg.value;
    this.product.pro_price = this.formProduct.controls.pro_price.value;
    this.service.updateProduct(this.pro_id,this.product).subscribe();
    this.toastr.info('Updated successfully');
   }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import {Product} from '../shared/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  public popoverTitle: string = 'Delete ';
  public popoverMessage: string = 'do you want to delete?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  product:Observable<Product>;
  //products:Product[];
  products:Observable<Product[]>;
  constructor(private service:ServiceService,private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData()
  {/*
    this.service.getProductList().subscribe(data=>{
      console.log(data)
      this.products=data
    },
    error=>{
      console.log(error);
    }
    );
    console.log(this.products);*/
    this.products=this.service.getProductList()
  }
deleteProduct(pro_id:number)
{
    this.service.deleteProduct(pro_id).subscribe(data=>{
      console.log(data);
      this.toastr.info('product details deleted','Oops');
    })
  
}
}

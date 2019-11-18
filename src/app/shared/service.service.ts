import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  product:Product;

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:60563/api";

  getProduct(pro_id:number):Observable<any>
  {
   return this.http.get(this.baseUrl+'/products/' +pro_id);
  }

  getProductList():Observable<any>
  {
    return this.http.get(this.baseUrl+ '/products');
  }
  addProducts(product:Product)
  {
   return this.http.post(this.baseUrl+'/products',product);
  }
  updateProduct(pro_id:number,product:Product)
  {
    return this.http.put(this.baseUrl+'/products/'+pro_id,product);
  }
  deleteProduct(pro_id:number)
  {
    return this.http.delete(this.baseUrl+'/products/'+pro_id);
  }

}

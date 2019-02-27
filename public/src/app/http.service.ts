import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  getProducts(){
  return this._http.get('/products');
 }


 getOneProduct(id:string){
  return this._http.get('/products/' + id);
  
 }

 createProduct(banana){

  return this._http.post('/products', banana);
  
 }

 editProduct(product){
  // console.log(product, '------')
  console.log('Ghost')
  console.log(product._id);
  console.log('Serhiy');
  return this._http.put('/products/'+product._id, product);
  
 }

 deleteProduct(id:string){
  return this._http.delete('/products/'+id);
  
 }


}



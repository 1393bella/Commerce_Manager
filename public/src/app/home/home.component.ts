import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product:any;

  products = [];
 
  newProduct: any;
  productToEdit = null;
  productToShow = null;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router

    ) { }


    
  ngOnInit() {
    this.getProductsFromService()
  }


    onAddClick() { 
      this.goNew();
      console.log(`Click add is working`);
    }
    goNew() {
      this._router.navigate(['/new']);
    }

//////////////////////
    //takoi vid methoda mojno ispolzovat tolko esli v buttone net [router link], nu etot code liwnui
    onViewClick(){ 
      this.goView();
      console.log(`Click view is working`);
    }
    goView() {
      this._router.navigate(['/view']);
    }
  
  
  
    getProductsFromService(){
      let observable = this._httpService.getProducts();
      observable.subscribe(data => {
        console.log("Got our all products!", data)
        // In this example, the array of products is assigned to the key 'products' in the data object. 
        // This may be different for you, depending on how you set up your Product API.
        this.products = data["data"];
        console.log(this.products)
      });
    }
  
  
  

  
}
      //// it will just display form and inside value
      // onEditClick(task){
      //   this.productToEdit = product;
      // }


      // showProduct(product: any){
      //   this.productToShow = product;
      // }
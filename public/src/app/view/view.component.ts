import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   getProduct =[];
   productToShow: any;

   product: any;
   products = [];
   errors = [];
  constructor( 
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
    ) { }

  ngOnInit() {
    this.productToShow = {
      name: "",
      quantity: "",
      price: "",
     _id: ""}
   
    this._route.params.subscribe((params: Params) => {
      this.getOneProduct(params['id'])
    });
    
  }


    getOneProduct(id:string){
      this._httpService.getOneProduct(id).subscribe(data => {
          console.log("Got our product!", data)
          // this.productToShow = data["daddy"];
          // console.log(params["id"]);
          this.productToShow = data["data"];
          console.log("RABBITSSSS!!!!!!!!!!!!!!!!")
          console.log(this.productToShow);
        });
    }



    // here delete logic without conditions:
    // deleteProduct(id:string){
    //   this._httpService.deleteProduct(id)
    //     .subscribe(products => this.products = products['data'])
    // }



    //here delete logic with conditions:
    deleteProduct(id){
      //console.log('Quantity must be 0 to delete a product')
      if  (this.productToShow.quantity===0){
          this._httpService.deleteProduct(id).subscribe(data => {console.log("successful deletion", data)})
          this._router.navigate(['/home']);

      }
      else {

          this.errors.push('Quantity must be 0 to delete a product')
          console.log(this.errors);
    

      }
    }




      
}

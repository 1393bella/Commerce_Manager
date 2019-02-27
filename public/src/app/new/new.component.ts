import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;
  products = [];
  //everything from form keys
  

  errors= []

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
    ) { }


  ngOnInit() {
     this.newProduct = {name: "",quantity: "",price: ""}
  }



  onCreateSubmit(){ 
    
    this._httpService.createProduct(this.newProduct).subscribe(data =>{
      console.log('99999999999999', data)
      if (data['message']==='Error'){
        // console.log(response)
        console.log('errors: ', data['error']['errors'])
        let banana = data['error']['errors']
        this.errors = []
        for(let errKey in banana){
          console.log('errKey: ', errKey)
          console.log('xxxx', banana[errKey]['message'])
          this.errors.push(banana[errKey]['message'])
        }
        //this.errors = data['error']['errors'];
        console.log("We got respond from database side aftre filling form", data)
        // this.newProduct = { name: "" }
        // this._router.navigate(['new'])
      //this.getProductsFromService()
    } else {
      this.goHome()
    }
     
  })
  }

  
  goHome() {
  this._router.navigate(['/home']);

  }




}
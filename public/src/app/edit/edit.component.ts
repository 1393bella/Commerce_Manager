import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product:any;
  products:[];
  productToEdit:any;
  errors = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.productToEdit = { _id: "",name: "",quantity: "",price: ""}
    this._route.params.subscribe((params: Params) => {
      this.getOneProduct(params['id']);
      console.log("GOPHERS!!!!!!!!!!!!!!!")
      console.log(params['id'])
  });
     
  }



    getOneProduct(id:string){
        this._httpService.getOneProduct(id).subscribe(data => {
          console.log("Got our product!", data)
          // this.productToEdit = data["daddy"];
          this.productToEdit = data["data"];
          console.log("RABBITSSSS!!!!!!!!!!!!!!!!")
          console.log(this.productToEdit);
        });
    }



      // edit without validation 
      // BananaEdit(product){
      //   console.log('Michael Jackson')
      //   console.log(product._id);
      //   console.log('312');
      //   const response = this._httpService.editProduct(product);
      //   response.subscribe(data =>{
        
      //     console.log('We just edited product', data);
      //     this.productToEdit = { name: "", _id: "",quantity: "",price: ""}
      //     this.goHome();
      //   })
        
      // }


  // edit with validation
  BananaEdit(product){
    console.log('Michael Jackson')
    console.log(product._id);
    console.log('312');
    const response = this._httpService.editProduct(product);
    response.subscribe(data =>{
    // this.productToEdit = { name: "", _id: "",quantity: "",price: ""}
      console.log('We just edited product', data);
      if (data['message']==='Error'){
        console.log('errors:', data['error']['errors'])
        let naryn = data['error']['errors']
        this.errors = []
        for (let errKey in naryn){
          console.log('errKey:', errKey)
          console.log('xxxx', naryn[errKey]['message'])
          this.errors.push(naryn[errKey]['message'])
        }
        // this.errors = data['error']['errors']

      }else{
        this.goHome()
      }
    })
    
  }



  goHome() {
    this._router.navigate(['/home']);
  }

  

}


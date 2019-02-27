import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  newProduct: any;
  products: any;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService:HttpService
  ) {}


  ngOnInit() {
    this.newProduct = {name: "" }
    this._route.params.subscribe((params: Params) => {
      
        console.log(params['id'])
    });
  }
  
  goHome() {
    this._router.navigate(['/home']);
  }

 
}


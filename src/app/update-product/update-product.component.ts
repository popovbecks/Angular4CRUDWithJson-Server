import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
id:number;
data:object = {};
products = [];
productObj:object = {};
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  updateProduct(product){
  this.productObj = {
    "name": product.name,
    "color": product.color
  };
    const url = `${"http://localhost:5555/products"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
      .toPromise()
      .then(()=> {
      this.router.navigate(['/'])
      })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get("http://localhost:5555/products").subscribe((data) => {
      this.products = data;
      for(let i = 0; i < this.products.length; i++) {
        if(parseInt(this.products[i].id) === this.id) {
          this.data = this.products[i];
          break;
        }
      }
    });
  }

}

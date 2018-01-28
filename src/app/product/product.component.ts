import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient) { }
productObj: object = {};
  isAdded: boolean = false;
  confirmationString:string = "New product has been added"
  addNewProduct = function (product) {
    this.productObj = {
      "name": product.name,
      "color": product.color
    }
    this.http.post("http://localhost:5555/products/", this.productObj).subscribe((res: HttpResponse<any>) => {
      this.isAdded = true;
    })
  }
  ngOnInit() {
  }

}

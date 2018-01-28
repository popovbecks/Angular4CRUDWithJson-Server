import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  products: object = [];
  id: number;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  fetchData() {
    this.http.get("http://localhost:5555/products").subscribe((data) => {
      this.products = data;
    });
  }
  deleteProduct(id){
    if(confirm("Are you sure?")) {
      const url = `${"http://localhost:5555/products"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
        .then(() => {
        this.fetchData();
        });
    }
  }

  ngOnInit() {
    this.fetchData();


  }

}
interface ItemsResponse {
  products: string[];
}

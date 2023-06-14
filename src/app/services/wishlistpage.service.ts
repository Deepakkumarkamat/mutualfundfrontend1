import { Injectable } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistpageService {
  // fund:any={
  //   name:"hdfc",
  //   year:"Three year",
  //   price:56,
  // percentage:"36.00%"}

  constructor(private http:HttpClient) {}
  addToWishList(customerId:number,mutualfundId:number){
    const headers = {'Content-Type':'application/json'}
    return this.http.post(`http://34.234.150.41:5152/wishlist/add?customerId=${customerId}&mutualfundId=${mutualfundId}`,{},{headers:headers,responseType:'text'})
  }

  viewWishList(customerId:number){
    return this.http.get(`http://34.234.150.41:5152/wishlist/${customerId}`)
  }

  
}

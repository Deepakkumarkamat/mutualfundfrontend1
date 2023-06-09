import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AllfundService } from 'src/app/services/allfund.service';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';
import { WishlistpageService } from 'src/app/services/wishlistpage.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
 options:AnimationOptions={
  path:'../../../../assets/52009-wishlist.json'
 }

 data:any;
 userId:number|any
 wishList:any[]=[]
 allfundData: any | [];
 animationCreated(animationCreated:AnimationItem){
  console.log('animation crated')
 }
  // wishList:any[]=[]
  constructor(private loginservice:LoginService,
    private wishlistService:WishlistpageService,
    private route:ActivatedRoute,
    private api:ApiService,
    private walletService:WalletService,
    private http:HttpClient,
    private allfunds:AllfundService){}
  // ngOnInit(){
  //   this.wishList = this._wishlistItem.mutual;
  //   console.log(this.wishList)
  // }
  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit(){
    this.data = this.route.snapshot.paramMap.get('id')
    this.walletService.finduserid(this.getCurrentUser()).subscribe((response:any)=>{
      console.log(response)
      this.userId =response
      console.log(this.userId)


      // this.allfunds.getMutualFunds().subscribe((res) => {
      //   console.log(res);

      //   this.allfundData = res;

      this.wishlistService.viewWishList(this.userId).subscribe((res:any)=>{
        // res
        // console.log(res)
         res.map((wish:any)=>{
          let newWish
          this.api.detailById(wish.mutualfundId).subscribe((response)=>{
            newWish={...wish,fundData:response[0]}
            console.log(this.wishList)
            this.wishList.push(newWish)
          })

        })
        console.log(this.wishList)
      })
    })
  // })



    // this.api.detailById(Number(this.route.snapshot.paramMap.get('id'))).subscribe((data)=>{
    //   this.data=data
    // })
    // console.log('data',this.data)
  }


  removeWishList(customerId:number,mutualfundId:number){
    const headers = {'Content-Type':'application/text'}
    return this.http.post(`http://34.234.150.41:5152/wishlist/remove?customerId=${customerId}&mutualfundId=${mutualfundId}`,{},{headers:headers,responseType:'text'}).subscribe((res:any)=>{
      alert(res)
      console.log(res)
    })
  }


  lower(str:string){
    return str?.split(' ')[0].toLowerCase()
  }


}

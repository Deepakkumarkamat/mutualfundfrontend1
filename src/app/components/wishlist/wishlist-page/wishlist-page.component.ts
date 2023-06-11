import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AllfundService } from 'src/app/services/allfund.service';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';
import { WishlistpageService } from 'src/app/services/wishlistpage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent {
  options: AnimationOptions = {
    path: '../../../../assets/52009-wishlist.json',
  };

  data: any;
  userId: number | any;
  wishList: any[] = [];
  allfundData: any | [];
  newWish: any[] = [];
  animationCreated(animationCreated: AnimationItem) {
    console.log('animation crated');
  }
  // wishList:any[]=[]
  constructor(
    private loginservice: LoginService,
    private wishlistService: WishlistpageService,
    private route: ActivatedRoute,
    private api: ApiService,
    private walletService: WalletService,
    private http: HttpClient,
    private allfunds: AllfundService,
    private router: Router
  ) {}

  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit() {
    this.data = this.route.snapshot.paramMap.get('id');

    this.getWishlist();
    // })
  }

  getWishlist() {
    this.walletService
      .finduserid(this.getCurrentUser())
      .subscribe((response: any) => {
        console.log(response);
        this.userId = response;
        console.log(this.userId);

        // let myFunction=()=>{

        // this.wishList.push(this.newWish)
        // }
        // });

        this.wishlistService.viewWishList(this.userId).subscribe((res: any) => {
          res.map((wish: any) => {
            // let newWish;
            this.api.detailById(wish.mutualfundId).subscribe((response) => {
              this.newWish = { ...wish, fundData: response[0] };
              console.log(this.wishList);
              this.wishList.push(this.newWish);
            });
            // this.wishList.push(this.newWish)
          });
          console.log(this.wishList);
        });
      });
  }

  removeWishList(customerId: number, mutualfundId: number) {
    const headers = { 'Content-Type': 'application/text' };
    return this.http
      .post(
        `http://34.234.150.41:5152/wishlist/remove?customerId=${customerId}&mutualfundId=${mutualfundId}`,
        {},
        { headers: headers, responseType: 'text' }
      )
      .subscribe((res: any) => {
        Swal.fire({
          title: 'Removed!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          if (result.value) {
            // if (result.isConfirmed) {
            // this.removeWishList(customerId, mutualfundId)
            // this.getWishlist()
            // this.getWishlist()
            // }
          }

        });
        // alert(res);
        this.wishList=[]
        this.getWishlist();

        console.log(res);
      });
  }

  lower(str: string) {
    return str?.split(' ')[0].toLowerCase();
  }
  // removeWishList1(customerId: number, mutualfundId: number) {

  // }
}

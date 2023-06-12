import { Component, EventEmitter, Output } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw-page',
  templateUrl: './withdraw-page.component.html',
  styleUrls: ['./withdraw-page.component.css'],
})
export class WithdrawPageComponent {
  @Output() balance = new EventEmitter<any>();
  balancewithdraw: number | any;
  username: any;
  userId: any;
  constructor(
    private api: WalletService,
    private sharedservice: SharedService,
    private loginservice: LoginService
  ) {}

  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit() {
    // this.sharedservice.username$.subscribe(username=>{
    //   this.username=username
    //   console.log(this.username)
    //   })
    //   this.userId=this.api.finduserid(this.username)
  }

  withdrawMoney() {
    this.api.finduserid(this.getCurrentUser()).subscribe((response: any) => {
      console.log(response);
      this.userId = response;
      // console.log(this.userId)

      this.api
        .withdrawBalance(this.userId, this.balancewithdraw)
        .subscribe((res: any) => {
          // alert(res);
          this.balance.emit(res);

          Swal.fire({
            title: res,
            icon: res ==='Insufficient balance'?'warning':'success',
            showConfirmButton: true,
            confirmButtonText: 'ok',
            confirmButtonColor: 'teal',
          }).then((result)=>{
            if(result.value){

            }

          })
          // window.location.reload();

          // transactionHistory() {
          // this.api
          //   .addTransactionHistory(this.userId, 'withdraw', this.balancewithdraw)
          //   .subscribe((res) => {
          //     console.log(this.transaction)
          //     alert(res);
          //     this.balancewithdraw=''
          //   });
          // }
          this.balancewithdraw=''
        });
    });
  }
}

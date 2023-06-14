import { Component } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  showDepositCard:boolean=true;
showWithdrawCard:boolean=false;
showTransactionList:boolean=false;
email:any
usedAmount:any
userId:number|any
  walletAmount:any[]=[];
  wallet={
    balance:'0'
  }
  constructor(private api:WalletService,private sharedservice:SharedService,private loginservice:LoginService){}
  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit(){
    // this.api.addMoney(1,1).subscribe((res:any)=>{
    //   return this.walletAmount = res;

    //
    // this.sharedservice.username$.subscribe(username=>{
    //  this.email=username
    // console.log(this.email)

    // })
    this.api.finduserid(this.getCurrentUser()).subscribe((response:any)=>{
      console.log(response)
      this.userId =response
      console.log(this.userId)


      console.log(this.userId)
      this.api.walletBalance(this.userId).subscribe((res:any)=>{
        console.log(res)
        return this.wallet.balance = Number(res).toFixed(2);


      })
      this.api.usedAmount(this.userId).subscribe((res:any)=>{
        console.log(res)
        return this.usedAmount = res;
      })
    })



  }
  getBalance(res:any){
    console.log(res)
    this.api.walletBalance(this.userId).subscribe((res:any)=>{
      return this.wallet.balance = Number(res).toFixed(2);

    })

  }
  showDeposit(){
   this.showDepositCard = true;
   this.showWithdrawCard = false;

  }
  showWithdraw(){
    this.showWithdrawCard =true;
    this.showDepositCard = false;
  }

  showTransaction(){
    this.showTransactionList = !this.showTransactionList;
    // this.showTransactionList = false;

  }


}

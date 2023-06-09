import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {
  history:any;
  userId:any|any;



constructor(private api:WalletService,private apii:ApiService,private loginservice:LoginService){}
getCurrentUser() {
  return this.loginservice.getLoggedInUser();
}
ngOnInit(){
  this.api.finduserid(this.getCurrentUser()).subscribe((response:any)=>{
    console.log(response)
    this.userId =response
    console.log(this.userId)
 this.api.walletHistory(this.userId).subscribe((data)=>{
    this.history=data
    this.history=this.history.sort((a:any,b:any)=>Date.parse(b.transactionDate)-Date.parse(a.transactionDate))
    console.log(this.history);

    // this.show=true
  })

  })


  }

}






import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import {baseUrl} from '../config'
@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(private http:HttpClient) { }

  addMoney(customerId: number, amount: number){
    const url = `http://34.234.150.41:1111/mutualfunds/wallet/update/addMoney?customerId=${customerId}&amount=${amount}`;
    // const body = { customerId, amount };

    const headers = { 'Content-Type': 'application/text' };
    return this.http.patch(url,{},{headers:headers, responseType:'text'});

    // return this.http.patch(url:'http://localhost:9091/mutualfunds/wallet/update/withdrawMoney?customerId=1&amount=5000',body:any,Option:'')
    // get('http://localhost:9091/mutualfunds/wallet/update/withdrawMoney?customerId=1&amount=5000').pipe(map((res:any)=>{
    //   return res;
    // }))



  }
  walletBalance(customerId: number){
    const url = `http://34.234.150.41:1111/mutualfunds/wallet/update/getAccountBalance?customerId=${customerId}`
    // const headers = { 'Content-Type': 'application/text' };
    return this.http.get(url,{responseType:"text"})

  }
  withdrawBalance(customerId:number,amount:number){
    const url = `http://34.234.150.41:1111/mutualfunds/wallet/update/withdrawMoney?customerId=${customerId}&amount=${amount}`;
    const headers = { 'Content-Type': 'application/text' };
    return this.http.patch(url,{},{headers:headers,responseType:'text'})
  }
  // &walletId=${walletId}
  // ,walletId:number
    addTransactionHistory(customerId:number,description:string,amount:number){
      const url=`http://34.234.150.41:1111/mutualfunds/wallet/updateTransactionHistory?customerId=${customerId}&description=${description}&walletAmount=${amount}`
      const headers = {'Content-Type':'application/text'}
      return this.http.patch(url,{},{headers:headers,responseType:'text'})
    }
      walletHistory(customerId:number){
      const url=`http://34.234.150.41:1111/mutualfunds/wallet/history?customerId=${customerId}`
      return this.http.get(url)
    }

    finduserid(username:string){
    return this.http.get(`http://34.234.150.41:5151/transactionhistory/userid/${username}`)
    }

}

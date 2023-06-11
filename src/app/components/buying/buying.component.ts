import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css'],
})
export class BuyingComponent {
  fundDetails: any;
  amount: number = 500;
  orderDate: string = '';
  id: string | any = '';
  loading: boolean = false;
  unit: number = -1;
  success: boolean = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiService,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.detailById(Number(this.id)).subscribe((data) => {
      this.fundDetails = data[0];
      console.log(this.fundDetails);
    });
  }
  continue(amountRef: any) {
    this.amount = amountRef.value;
    this.unit = Number(this.amount) / Number(this.fundDetails.currentPrice);
    document.getElementById('modalBtn')?.click();
    this.success = true;
  }
  buymethod() {
    this.loading = true;
    this.success=false

    // this.http.post(`http://34.234.150.41:5151/transactions/updateportfolio?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${this.id}&price=${this.amount}&unit=1`, {},{responseType:'text'}).subscribe((data) => {
    //   console.log(this.loginService.getLoggedInUser(),data)
    const headers = { 'Content-Type': 'application/text' };
    this.http
      .post(
        `http://34.234.150.41:5151/transactionhistory/insert?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${
          this.id
        }&type=buy&price=${this.amount}&unit=${this.unit}`,
        {},{ headers: headers, responseType: 'text' }
      )
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          title:res==='Data inserted successfully'?'Succesfully Buy!':res,
          showConfirmButton:true,
          confirmButtonText:'ok',
          confirmButtonColor:'teal'

        }).then((result)=>{
          if(result.value){

          }
        })
      });

    this.loading = false;
 this.success=true
    setTimeout(() => {
      this.success = false;
      document.getElementById('modalclose')?.click();
      this.router.navigate(['dashboard']);
    }, 20);

    // },
    (err: any) => {
      console.log(err);
      this.loading = false;
    };
    // )
  }
}

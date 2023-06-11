import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.css'],
})
export class SipComponent {
  fundDetails: any;
  amount: number = 0;
  freq: string = '';
  orderDate: string = ''
  id: string | any = '';
  loading: boolean = false;
  unit: number | any;
  success: boolean = false;
  // today:any=
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private api: ApiService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.orderDate = new Date(Date.now()).toLocaleDateString();
    console.log(this.orderDate);
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.detailById(Number(this.id)).subscribe((data) => {
      this.fundDetails = data[0];
      console.log(this.fundDetails);
    });

  }
  continue() {
    this.unit = (
      Number(this.amount) / Number(this.fundDetails.currentPrice)
    ).toFixed(3);
    this.success = true;
  }
  buymethod() {
    this.success = false;
    this.loading = true;

    // this.http
    //   .post(
    //     `http://34.234.150.41:5151/transactions/updateportfolio?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${this.id}&price=${this.amount}&unit=${this.unit}`,{},
    //     { responseType: 'text' }
    //   )
    //   .subscribe(
    //     (data) => {
    //       console.log(this.loginService.getLoggedInUser(), data);
    const headers = { 'Content-Type': 'application/text' };
          this.http
            .post(
              `http://34.234.150.41:5151/transactionhistory/insert?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${this.id}&type=buy&price=${this.amount}&unit=${this.unit}`,
              {},{ headers: headers, responseType: 'text' }
            )
            .subscribe((res) => {
              Swal.fire({
                title:res==='Data inserted successfully'?'Succesfully Buy!':res,
                showConfirmButton:true,
                confirmButtonText:'ok',
                confirmButtonColor:'teal'

              }).then((result)=>{
                if(result.value){
                  this.router.navigate(['/dashboard']);

                }
              })
              console.log(res);

            });

            this.loading = false;
          this.success = true;

          setTimeout(() => {
            this.success = false;
            document.getElementById('modalclose')?.click();
            // this.router.navigate(['dashboard']);
          }, 20);
        // },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      // );
  }
}

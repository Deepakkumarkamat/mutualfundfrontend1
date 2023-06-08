import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AllfundService } from 'src/app/services/allfund.service';
import { ElementRef } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-dashboard-home',

  templateUrl: './dashboard-home.component.html',

  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  mutualFunds: any;

  flag: any;

  error: any;

  detailList: any[] = [];

  allBottomDetail: any[] = [];

  data: any;
  showAllfund: boolean = false;

  portfolio: any = [];

  userId: number | any;

  constructor(
    private api: ApiService,
    private router: Router,
    private fund: AllfundService,
    private elementref: ElementRef,
    private walletservice: WalletService,
    private allfunds: AllfundService,
    private loginservice:LoginService,

  ) {}
  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit() {
    this.walletservice
      .finduserid(this.getCurrentUser())
      .subscribe((response: any) => {
        console.log(response);

        this.userId = response;

        console.log(this.userId);

        this.api.getPortfolio(this.userId).subscribe((res: any) => {
          console.log(res);

          this.portfolio = res;
          this.portfolio= this.portfolio.filter((data:any)=>(data.unit>0))

          let allfundData: any | [];

          this.allfunds.getMutualFunds().subscribe((res) => {
            console.log(res);

            allfundData = res;

            this.portfolio = this.portfolio.map((data: any) => {
              let index = allfundData.findIndex(
                (fil: any) => fil.schemaId == data.mutualFundsId
              );

              let obj = { ...data, funds: { ...allfundData[index] } };
              return obj;
            });
            console.log('portfolio: ', this.portfolio);
          });

          console.log('unit=' + this.portfolio.unit);
        });
      });

    this.api.getTopDetail().subscribe((res) => {
      this.detailList = res;

      console.log(this.detailList);

      // this.loadMutualFunds();
    });

    this.api.getBottomDetail().subscribe((res) => {
      this.allBottomDetail = res;
    });

    // paste
  }

  showAllMutualfund() {
    this.showAllfund = !this.showAllfund;

    // document.getElementById("horizontal-list")?.scroll({behavior:'smooth',top:-10000})
  }

  fetchById(schemaId: number): void {
    this.api.detailById(schemaId).subscribe((data) => {
      this.data = data;

      console.log(data[27]);
    });
  }

  options: AnimationOptions = {
    path: '../../../assets/135363-mutual-funds-investment.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  loadMutualFunds() {
    this.fund
      .getMutualFunds()

      .subscribe((data: any[]) => {
        this.mutualFunds = data;
      });
  }

  scrollElemet() {
    const element = this.elementref.nativeElement.querySelector('#fundsection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  getFundDetails(id: any) {
    this.api.detailById(id).subscribe((res) => {
      return res;
    });
  }

  lower(str:string){
    return str.split(' ')[0].toLowerCase()
  }
}

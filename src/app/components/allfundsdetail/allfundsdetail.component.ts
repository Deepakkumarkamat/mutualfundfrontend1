import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistpageService } from 'src/app/services/wishlistpage.service';
import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allfundsdetail',
  templateUrl: './allfundsdetail.component.html',
  styleUrls: ['./allfundsdetail.component.css'],
})
export class AllfundsdetailComponent {
  allTopfundDetail: any[] = [];
  id: any;
  fundDetail: any;
  show: boolean = false;
  monthlysip:boolean=true;
  oneTime:boolean=false;
  upi:boolean=false;
  inputAmount=''
  name:any;
  userId:number|any;

  chartOptions ={}
  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  constructor(private walletService:WalletService, private apii: ApiService, private router:Router, private route: ActivatedRoute,private wishlistService:WishlistpageService,private loginservice:LoginService) {}
  ngOnInit() {


    this.id = this.route.snapshot.paramMap.get('id');
    this.apii.detailById(this.id).subscribe((res) => {
      this.fundDetail = res[0];
      console.log(this.fundDetail);
      this.show = true;
      let dataPoints=[]
      let date=0
      for(let i=100;i<=300;i++){
        dataPoints.push({x: new Date(2023,date,i),y: ( 1000 +(5*Math.random()*(i)-(Math.random()*i/(i*Math.E)))) - (this.fundDetail.delta*100 )  })
      }
      date++
      setInterval(()=>{
        for(let i=1;i<=2;i++){
          dataPoints.push({x: new Date(2023,date,i),y: ( 1000 +100*Math.random()) - (this.fundDetail.delta*100 )  })
        }
      },100)
      this.chartOptions= {
        animationEnabled:true,
        theme:'#e51a28',
        zoomeEnabled:true,
        title: {
          text: this.fundDetail.schemaName
        },
        axisX: {
          valueFormatString: "MMM YYYY"
        },
        axisY2: {
          title: "Price Value",
          prefix: "$",
          suffix: "K"
        },
        data: [{
          type: "line",
          color: "teal",
          dataPoints: dataPoints
        }]

      };

    });

    this.apii.getTopDetail().subscribe((res:any)=>{
      return this.allTopfundDetail = res;
    });
  }

  ngOnDistroy() {
    this.show = false;
  }

  showMonthlySip() {
    this.monthlysip = true;
    this.oneTime = false;
    this.upi = false;
  }

  showOneTime() {
    this.oneTime = true;
    this.monthlysip = false;
    this.upi = false;
  }

  showUpi() {
    this.upi = true;
    this.monthlysip = false;
    this.oneTime = false;
  }

  getRatingStars(rating: number): string {
    if (rating < 0) {
      return '⭐⭐';
    } else if (rating < 5) {
      return '⭐⭐⭐';
    } else if (rating < 10) {
      return '⭐⭐⭐⭐';
    } else {
      return '⭐⭐⭐⭐⭐';
    }
  }

  // toshowsip(id:any){
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   this.router.navigate(['dashboard/allfundsdetail/'+this.id+'/sip'])
  // }
  // goToSip(){
  //   this.router.navigate(["/sip"])
  // }

  //forWishList...
  add(){
    this.walletService.finduserid(this.getCurrentUser()).subscribe((response:any)=>{
      console.log(response)
      this.userId =response

      this.wishlistService.addToWishList(this.userId,this.id).subscribe((res:any)=>{
        console.log(res)

        Swal.fire({
          title:res==='Data added successfully'?'Fund added successfully to wishlist!':'Already exists in wishlist' ,
          icon:res==-''?'warning':'success',
          showConfirmButton:true,
          confirmButtonText:'ok',
          confirmButtonColor:'teal'
        }).then((result)=>{
          if(result.value){
            this.router.navigate(['/dashboard/allfundsdetail/wishlist/wishlist-page'])

          }
        })
      })
    })

  }
  lower(str:string){
    return str?.split(' ')[0].toLowerCase()
  }
}

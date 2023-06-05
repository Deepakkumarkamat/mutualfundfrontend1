import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';
import { ApiService } from 'src/app/services/api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  history:any;
  userId:any|any;
  constructor(private loginservice: LoginService, private api:WalletService,private apii:ApiService,private router: Router) {}
  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }
  ngOnInit() {
//from transactionhistory
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


    window.addEventListener('resize', () => {
      if (window.innerWidth < 650) {
        document
          .getElementById('toggleBtn')
          ?.style.setProperty('display', 'visible');
      } else {
        document
          .getElementById('toggleBtn')
          ?.style.setProperty('display', 'none');
      }
    });

    console.log('loggedin', this.isLoggedIn());

    if (!this.isLoggedIn()) {
      document.getElementById('login')?.style.setProperty('display', 'block');
    } else {
      document.getElementById('login')?.style.setProperty('display', 'none');
    }
  }

  logout() {
    Swal.fire({
      title: 'Confirm Logout',

      text: 'Are you sure you want to logout?',

      icon: 'question',

      showCancelButton: true,

      showConfirmButton: true,

      confirmButtonColor: '#008080',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.value) {
        this.loginservice.logout();
      }
    });
  }

  isLoggedIn() {
    return this.loginservice.isLoggedIn();
  }

  goTologin() {
    this.router.navigate(['login']);
  }

  goTosignUp() {
    this.router.navigate(['register']);
  }


}

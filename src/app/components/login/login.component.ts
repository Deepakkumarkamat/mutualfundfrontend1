import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 errorMesage:string=''


  credentials={
    username:'',
    password:''
  }

  constructor(private loginService:LoginService,
    private router:Router,
     private sharedservice:SharedService,
     private ngxService: NgxUiLoaderService
     ){ }


  ngOnInit(): void {


  //  let user:HTMLInputElement|any = document.getElementById('user')
  //  this.credentials.username=user.value
  // user.value=''
  // if(this.loginService.isLoggedIn()){
  //   this.router.navigate(["/dashboard"])

  // }


  }


newusername(){
  this.sharedservice.setUsername(this.credentials.username)

}

  onSubmit(){
    // console.log("Form is Submitted!!")
    this.ngxService.start()

    if((this.credentials.username!='' && this.credentials.password!='')&& (this.credentials.username!=null && this.credentials.password!=null)){
      console.log("We have to submit the form to server!!");
      //token generate

      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          //success
          console.log(response.token);
          // this.loginError
          // this.respose.token






          this.loginService.loginUser(response.token)
          this.ngxService.stop()
          // Swal.fire({
          //   icon:'success',
          //   title:'Login Successful',
          //   text:'You have Successfully logged in!',
          //   showCancelButton:false,
          //   confirmButtonText:'Ok',
          //   confirmButtonColor:'#008080'
          // }).then((result)=>{
          //   if (result.value) {
              this.router.navigate(["/dashboard"])
          //   }
          // })

          // window.location.href=
          this.credentials.password=''
          this.credentials.username=''
        },
        error=>{
          this.ngxService.stop()
          //error
          console.log(error);
          Swal.fire({
            icon:'error',
            confirmButtonColor:'#008080',
            title:'Login Failed!',
            text:'Invalid Username or password'

          })




        }
      )
    }else{
      console.log("Fields are Empty")
    }
  }
  resButton(){
    this.credentials.username=''
    this.credentials.password=''
    this.errorMesage = ''
  }
  goToReegistration(){
    this.router.navigate(['/register'])
  }
  sendOtp(){
    this.router.navigate(['/sendOtp'])
  }

}

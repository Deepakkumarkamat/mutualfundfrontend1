import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../config';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UpdatePassword } from '../classes/update-password';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedUser: any;
  //url="http://localhost:9596"

  constructor(private http: HttpClient, private router: Router) {}

  //calling the server to generate token

  generateToken(credentials: any) {
    return this.http.post(`http://34.234.150.41:9596/token`, credentials);
  }

  // validateCredentials(credentials:any):Promise<boolean>{
  //   return new Promise((resolve:any,reject)=>{
  //     this.generateToken(credentials).subscribe((response:any)=>{
  //       // Validation logic here
  //       if (response.success){
  //         resolve(true);
  //         // Credentials are valid
  //       }else{
  //         resolve(false);
  //         // Credentials are invalid
  //       }
  //     },
  //       (error:any)=>{
  //         reject(error);
  //       }
  //       );
  //     });
  //   }
  // }

  //for login user
  loginUser(token: any) {
    try {
      this.loggedUser = jwtDecode(token);
    } catch (error) {}

    localStorage.setItem('token', token);
    // localStorage.setItem("expire": Date.now()+1000)
    return true;
  }
  getLoggedInUser() {
    if(!this.loggedUser){
      let token: any = localStorage.getItem('token');

      this.loggedUser = jwtDecode(token);
    }
    return this.loggedUser?.sub;
  }

  //to check user is login or not
  isLoggedIn() {
    let token: any = localStorage.getItem('token');
    try {
      this.loggedUser = jwtDecode(token);
    } catch (error) {}

    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //for logout
  logout() {
    localStorage.removeItem('token');
    this.loggedUser=null
    this.router.navigate(['/']);
    return true;
  }

  //for getting the token
  getToken() {
    return localStorage.getItem('token');
  }

  sentEmail(email:string){
    const headers = {'Content-Type':'application/json'}
    return this.http.get(`http://34.234.150.41:6161/customer/send?email=${email}`,{headers:headers,responseType:'text'})
  }

  updatepassword(otp:number,user:UpdatePassword){
    const url =`http://34.234.150.41:6161/customer/update/password?otp=${otp}`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(url,user,{headers:headers,responseType:'text'})
      }
}

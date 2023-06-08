import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  sentSuccess: boolean = true;
   email=''
  submitted:boolean=false;
  forgotForm!: FormGroup;
  constructor(
    private router: Router,  private formbuilder: FormBuilder,    private loginservice: LoginService
  ) {}

  ngOnInit() {
    this.forgotForm = this.formbuilder.group({
      email: ['', Validators.required],
    });

  }
  get form() {
    return this.forgotForm.controls;
  }  senOtp() {
    this.submitted = true;
    if(this.forgotForm.invalid){
      return
    }

    const data = this.forgotForm.value;
    const userName = data.email;
    console.log(data);
    this.loginservice.sentEmail(userName).subscribe((res: any) => {
      console.log(res);

    });


    this.router.navigate(['/update', userName]);
  }



}

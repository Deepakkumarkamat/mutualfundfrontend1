import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

import { UpdatePassword } from 'src/app/classes/update-password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css'],
})
export class SendOtpComponent {
  // password:any
  // confirmPassword:any
  passwordForm!: FormGroup;
  email: any;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.passwordForm = this.formbuilder.group(
      {
        otp: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)],],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.MustMatch('password', 'confirmPassword') }
    );
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls[controlName];
      const matchingControl = formgroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  updateNewPassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    const data = this.passwordForm.value;
    const otp = data.otp;
    const user1 = new UpdatePassword(this.email, data.password);
    console.log(user1);
    this.loginService.updatepassword(otp, user1).subscribe((res: any) => {
      Swal.fire({
        title: res,
        icon:
          res === 'Enter Correct OTP or Resend the OTP' ? 'warning' : 'success',
        showConfirmButton: true,
        confirmButtonText: 'ok',
        confirmButtonColor: 'teal',
      }).then((result) => {
        if (result.value) {
          if (res === 'Enter Correct OTP or Resend the OTP') {
            return;
          } else {
            this.router.navigate(['/login']);
          }
        }
      });

      console.log(res);
    });
  }
  get form() {
    return this.passwordForm.controls;
  }
  showUpdate() {
    this.router.navigate(['/update']);
  }
}

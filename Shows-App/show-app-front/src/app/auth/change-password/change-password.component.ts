import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { createPasswordStrengthValidator, createPasswordStrengthValidatorCONFIRM } from '../passwordValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;

  constructor(public authService: AuthService, public fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getauthPasswordChangedListener().subscribe(
      authPasswordChanged => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      // \w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)
      // email: ['', Validators.required, Validators.pattern('\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)')],
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: createPasswordStrengthValidatorCONFIRM("newPassword", "confirmPassword") });
  }

  onSave() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form);

    this.isLoading = true;
    this.authService.SaveNewPassword(this.form.value.email, this.form.value.password, this.form.value.newPassword);
  }


  get password() {
    return this.form.controls['password'];
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AbstractFormGroupDirective, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { createPasswordStrengthValidator, createPasswordStrengthValidatorCONFIRM } from '../passwordValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;

  constructor(public authService: AuthService, public fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      });

    // this.myForm = this.fb.group({
    //   password: ['', [Validators.required]],
    //   confirmPassword: ['']
    // }, { validators: this.checkPasswords })

    this.form = new FormGroup({
      // \w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)
      // email: ['', Validators.required, Validators.pattern('\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)')],
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern(`([A-Za-z0-9\-\_]+)`)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: createPasswordStrengthValidatorCONFIRM("password", "confirmPassword") });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  onSignup() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form);

    this.isLoading = true;
    this.authService.createUser(this.form.value.email, this.form.value.username, this.form.value.password);
  }


  get password() {
    return this.form.controls['password'];
  }


}



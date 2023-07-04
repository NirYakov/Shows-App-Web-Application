import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

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

    this.form = new FormGroup({
      // \w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)
      // email: ['', Validators.required, Validators.pattern('\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)')],
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern(`([A-Za-z0-9\-\_]+)`)]),
    })
  };

  onGetNewPassword() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form);

    this.isLoading = true;
    // this.authService.createUser(this.form.value.email, this.form.value.username);
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;

  constructor(public authService: AuthService) { }

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
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern(`([A-Za-z0-9\-\_]+)`)]),
    });
  }

  onSignup() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.authService.createUser(this.form.value.email, this.form.value.username, this.form.value.password);
  }

}

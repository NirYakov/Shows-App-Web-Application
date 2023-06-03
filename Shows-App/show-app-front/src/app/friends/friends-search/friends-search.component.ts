import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    // this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    //   authStatus => {
    //     this.isLoading = false;
    //   });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      // password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern(`([A-Za-z0-9\-\_]+)`)]),
    });
  }


  onLogin() {


    console.log("this.form.get(email).valid", this.form.get("email").valid);
    console.log("this.form.get(username).valid", this.form.get("username").valid);

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    // this.authService.login(this.form.value.email, this.form.value.username, this.form.value.password);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

}

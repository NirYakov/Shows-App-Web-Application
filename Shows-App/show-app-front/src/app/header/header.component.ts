import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  usernamePicLink = ""; // profilePicLink

  ngOnInit() {

    // console.log(this.usernamePicLink);


    this.userIsAuthenticated = this.authService.getIsAuth();
    const username = this.authService.getUsername();
    this.usernamePicLink = `https://api.dicebear.com/6.x/micah/svg?seed=${username}`;

    this.authListenerSub = this.authService
      .getAuthStatusListener().subscribe(authResult => {
        this.userIsAuthenticated = authResult.isAuthenticated,
          // this.usernamePicLink = `https://api.dicebear.com/6.x/micah/svg?seed=Felix2-_`;
          this.usernamePicLink = `https://api.dicebear.com/6.x/micah/svg?seed=${authResult.username}`;
        console.log(this.usernamePicLink);

        console.log("CLEAR!@");

      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  // https://api.dicebear.com/6.x/micah/svg?seed=Felix2-_



}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  title = "Track Your Shows ( Movies & Tv's )"
  longText = "alot of text";

  ngOnInit() {
    // need to do it better with new landing page that
    // will route nice

    if (this.authService.getIsAuth()) {
      const url = this.route.snapshot.routeConfig.path;
      console.log("url ", url);
      if (url.length === 0) {
        this.router.navigate(["/myshows"]);
      }
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  appOptionFeatures = [

    {
      title: "Save Your Shows",
      content: "You can track the show you watched rate and review them."
    },
    {
      title: "Add Friend",
      content: "Search and add your friend"
    },
    {
      title: "Me And Friend",
      content: "You can see what your friend watched , find the same shows you watched and the difference shows"
    },
    {
      title: "Edit your show (review, rating)",
      content: "When you feel like you can edit your show (review, rating) to be most accrete"
    },
    {
      title: "Play rating game (imdb)",
      content: "Play shows game that you chose higher/lower rating of show vs other show"
    },
  ];


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  appTitle = "Hey, series and movies lovers";
  appSubTitle = "Website to tracking your Shows.";

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

  /*

  title : "Save Your Shows",
  content : "You can track the show you watched rate and review them."

  title : "Add Friend",
  content : "Search and add your friend"

  title : "Me And Friend",
  content : "You can see what your friend watched , find the same shows you watched and the difference shows"

  title : "Play rating game (imdb)",
  content : "Play shows game that you chose higher/lower rating of show vs other show"

  title : "Edit your show (review,rating)",
  content : "When you feel like you can edit your show (review,rating) to be most accrete"



  */

  /*


  -----

          Hello and welcome to Track Shows Web Application

          -----



Hi, series and movie lovers
You are on a website tracking your plans.

It is possible on the site to play a rating game according to IMDB.
Adding a rating series/movie, and writing a comment.
Adding friends to the app/site.
Friends can see each other's series and also check the similarities and differences.

Each user has a profile picture which is linked to a username, each name is unique and gives a unique image.

If they have comments for me the key, I would love to hear improvement/preservation and new features and everything that comes up in the creative imagination.

A pleasant stay on the site, Smile :)




  */

}

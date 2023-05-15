import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Show } from './show.model';
import { ShowsGameService } from '../shows-game.service';


enum GameAnswer {
  higher,
  lower,
}

@Component({
  selector: 'app-shows-game-highlow',
  templateUrl: './shows-game-highlow.component.html',
  styleUrls: ['./shows-game-highlow.component.scss']
})
export class ShowsGameHighlowComponent implements OnInit, OnDestroy {

  GameAnswer: typeof GameAnswer = GameAnswer;

  shows: Show[] = [
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
    },
    {
      title: "Better Call Saul",
      img: "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 8.9,
    },
    {
      title: "Breaking Bad",
      img: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 9.4,
    },
    {
      title: "Peaky Blinders",
      img: "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_Ratio0.7910_AL_.jpg",
      rating: 8.7,

    },
    {
      title: "Friends",
      img: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.8,

    },
    {
      title: "Seinfeld",
      img: "https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.7015_AL_.jpg",
      rating: 8.9,
    },

  ];

  firstImg = this.shows[0].img;
  secondImg = this.shows[1].img;

  firstTitle = this.shows[0].title;
  secondTitle = this.shows[1].title;

  maxScore = 0;
  score = 0;

  gameOver = false;

  media = "movies";

  rating: number = this.shows[0].rating;
  rating2: number = this.shows[1].rating;


  private showsSub: Subscription;

  index = 0;

  constructor(private showsGameService: ShowsGameService) { }

  ngOnInit() {

    this.nextShowsGame();

    this.showsGameService.getShows(this.media);

    this.showsSub = this.showsGameService
      .getShowUpdateListener()
      // .subscribe((showsData: { shows: Show[] }) => {
      .subscribe((showsData: { shows: Show[] }) => {
        this.shows = showsData.shows;


        // TO del , its for my testing if all good
        this.testingWithoutSameNextRatings();


        this.getShowsToGame(); // only log to console

        this.newGame();



      });

  }

  testingWithoutSameNextRatings() {
    const skipsShows: Show[] = [];

    let k = 0;
    skipsShows.push(this.shows[0]);

    this.shows.forEach((el) => {
      if (skipsShows[k].rating !== el.rating) {
        skipsShows.push(el);
        k++;
      }
    });

    this.shows = skipsShows;
  }

  onChangeTheMedia() {


    if (this.media === "movies") {
      this.media = "tv";
    } else {
      this.media = "movies";
    }

    this.showsGameService.getShows(this.media);

  }

  newGame() {
    this.index = 0;
    this.nextShowsGame();
    this.score = 0;
    this.gameOver = false;
    this.shuffleShows();
  }

  shuffleShows() {
    console.log("Not implement ...");
  }

  ngOnDestroy(): void {
    this.showsSub.unsubscribe();
  }

  // indexes: number[] = []; // if i want to do random without any repet (data must be unique)

  getShowsToGame() {
    // this.showsGameService.getShows();
    console.log(this.shows);
    // this.nextShowsGame();
  }

  nextShowsGame() {

    this.firstImg = this.shows[this.index].img;
    this.firstTitle = this.shows[this.index].title;

    this.rating = this.shows[this.index].rating;

    this.index += 1;
    this.index = this.index % this.shows.length;

    this.secondImg = this.shows[this.index].img;
    this.secondTitle = this.shows[this.index].title;

    this.rating2 = this.shows[this.index].rating;

  }

  onClickShowsAction(gameAnswer: GameAnswer) {

    if (this.gameOver) {
      return;
    }



    const lenAry = this.shows.length;
    const currentIndex = (this.index - 1 + lenAry) % lenAry;
    const leftShow = this.shows[currentIndex];
    const nextIndex = (currentIndex + 1) % lenAry;
    const rightShow = this.shows[nextIndex];

    if (leftShow.rating > rightShow.rating) {
      if (gameAnswer === GameAnswer.lower) { // currect answer
        this.score++;
        this.nextShowsGame();
      } else {// wrong answer
        this.gameOver = true;
      }
    }
    else {
      if (gameAnswer === GameAnswer.lower) { // wrong answer
        this.gameOver = true;
      } else {// currect answer
        this.score++;
        this.nextShowsGame();
      }

    }

    if (this.score >= this.maxScore) {
      this.maxScore = this.score;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}

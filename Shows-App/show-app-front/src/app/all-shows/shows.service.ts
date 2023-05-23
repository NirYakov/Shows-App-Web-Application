import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ShowGame } from '../shows-game/shows-game-highlow/showGame.model';
import { Show } from './show.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ShowsService implements OnInit {

  shows: Show[];



  constructor(private http: HttpClient) { }

  ngOnInit(): void {


  }


  getAllShows() {
    console.log("ShowsService ShowsService ShowsService");

    this.shows = [...this.showsStaticData];
    console.log("init shows : ", this.shows);
    console.log("init shows : ", this.showsStaticData);

    return this.shows;

  }




  showsStaticData: Show[] = [
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
      type: "tv"
    },
    {
      title: "Better Call Saul",
      img: "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 8.9,
      type: "movie"

    },
    {
      title: "Breaking Bad",
      img: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 9.4,
      type: "tv"
    },
    {
      title: "Peaky Blinders",
      img: "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_Ratio0.7910_AL_.jpg",
      rating: 8.7,
      type: "tv"
    },
    {
      title: "Friends",
      img: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.8,
      type: "tv"
    },
    {
      title: "Seinfeld",
      img: "https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.7015_AL_.jpg",
      rating: 8.9,
      type: "tv"
    },

  ];

}

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Show } from './show.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/shows/";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ShowsService {

  shows: Show[];



  constructor(private http: HttpClient, private router: Router) { }


  getAllShows() {
    // console.log("ShowsService ShowsService ShowsService");



    this.shows = [...this.showsStaticData];
    console.log("init shows : ", this.shows);
    console.log("init shows : ", this.showsStaticData);

    return this.shows;

  }



  addPickedShow(show: Show) {

    this.showsStaticData.push(show);
    this.router.navigate(["/"]);

    const showData = show;

    this.http
      .post<{ message: string; show: Show }>(
        BACKEND_URL,
        showData
      )
      .subscribe(
        {
          next: responseData => {
            this.router.navigate(["/"]);
          },
          error: error => {
            console.log("error on the add show.");
          }
        });
  }




  showsStaticData: Show[] = [
    {
      title: "Mr. Bean",
      img: "https://m.media-amazon.com/images/M/MV5BMGNhODY0ZjktYjY2ZS00MGNkLTg2ZTUtMGEwNGRlMmY3ZjQ4XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.5,
      type: "tv"
    },
    {
      title: "The Offer",
      img: "https://m.media-amazon.com/images/M/MV5BMzU1YWU3ZWItYTA4Yy00M2Q0LTkzZTQtYzFmNzVlZTg1ZTQwXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg",
      rating: 8.5,
      type: "tv"
    },
    {
      title: "Deadwood",
      img: "https://m.media-amazon.com/images/M/MV5BNDJhMjUzMDYtNzc4MS00Nzk2LTkyMGQtN2M5NTczYTZmYmY5XkEyXkFqcGdeQXVyMzU3MTc5OTE@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.6,
      type: "tv"
    },
    {
      title: "This Is Us",
      img: "https://m.media-amazon.com/images/M/MV5BNzYxYWY3YzctZjRiNS00MTViLTk5OTYtZDEyNzAwNGE5ODY0XkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.6,
      type: "tv"
    },


    {
      title: "The Good, the Bad and the Ugly",
      img: "https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.8,
      type: "movie"
    },
    {
      title: "Forrest Gump",
      img: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.8,
      type: "movie"
    },
    {
      title: "Fight Club",
      img: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.7,
      type: "movie"
    },

  ];

}

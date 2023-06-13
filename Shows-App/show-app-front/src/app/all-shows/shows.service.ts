import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Show } from './show.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/shows/";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ShowsService {

  shows: Show[] = [];
  pickedShow: Show;

  private showsStatusListener = new Subject<Show[]>();

  constructor(private http: HttpClient, private router: Router) {
    // this.myInitToDel();

  }


  myInitToDel() {
    // this.shows = [...this.showsStaticData];
    this.getAllShows();
  }

  getShowsStatusListener() {
    return this.showsStatusListener.asObservable();
  }

  getAllShows() {
    // console.log("ShowsService ShowsService ShowsService");



    // this.shows = [...this.showsStaticData];

    // console.log("init shows : ", this.shows);
    // console.log("init shows : ", this.showsStaticData);

    console.log(BACKEND_URL);

    this.http
      .get<{ message: string; shows: Show[] }>(
        BACKEND_URL)
      .subscribe(
        {
          next: responseData => {
            // this.router.navigate(["/"]);
            console.log(responseData);
            this.shows = responseData.shows;
            this.showsStatusListener.next(this.shows);
          },
          error: error => {
            console.log(error);
          }
        });
  }

  moveToSinglePage(show: Show) {
    // showname
    const showName = show.title;
    this.router.navigate([`/myshows/${showName}`]);
    this.pickedShow = show;
  }



  addPickedShow(show: Show) {

    this.shows.push(show);
    this.router.navigate(["/myshows"]);

    const showData = show;

    this.http
      .post<{ message: string; show: Show }>(
        BACKEND_URL,
        showData
      )
      .subscribe(
        {
          next: responseData => {
            // this.router.navigate(["/"]);
            console.log(responseData);
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
      rating: 5,
      type: "tv",
      review: `Mr. Bean Mr. Bean Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      seasons: 1,
    },
    {
      title: "The Offer",
      img: "https://m.media-amazon.com/images/M/MV5BMzU1YWU3ZWItYTA4Yy00M2Q0LTkzZTQtYzFmNzVlZTg1ZTQwXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg",
      rating: 4,
      type: "tv",
      review: `The Offer The Offer is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      seasons: 10
    },
    {
      title: "Deadwood",
      img: "https://m.media-amazon.com/images/M/MV5BNDJhMjUzMDYtNzc4MS00Nzk2LTkyMGQtN2M5NTczYTZmYmY5XkEyXkFqcGdeQXVyMzU3MTc5OTE@._V1_Ratio0.6716_AL_.jpg",
      rating: 3,
      type: "tv",
      review: `Deadwood Deadwood is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      seasons: 4
    },
    {
      title: "This Is Us",
      img: "https://m.media-amazon.com/images/M/MV5BNzYxYWY3YzctZjRiNS00MTViLTk5OTYtZDEyNzAwNGE5ODY0XkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_Ratio0.6716_AL_.jpg",
      rating: 1,
      type: "tv",
      review: `This Is Us This Is Us is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      seasons: 3
    },


    {
      title: "The Good, the Bad and the Ugly",
      img: "https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg",
      rating: 4,
      type: "movie",
      review: `The Good, the Bad and the Ugly Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      minutes: 124
    },
    {
      title: "Forrest Gump",
      img: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6716_AL_.jpg",
      rating: 5,
      type: "movie",
      review: `Forrest Gump Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      minutes: 166
    },
    {
      title: "Fight Club",
      img: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg",
      rating: 2,
      type: "movie",
      review: `Fight Club Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         It has survived not only five centuries,`,
      minutes: 201
    },

  ];

}

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
    // const showName = show.title;
    // this.router.navigate([`/myshows/${showName}`]);
    // this.pickedShow = show;

    const showId = show.apiId;
    this.router.navigate([`/myshows/${showId}`]);
    // this.pickedShow = show;
  }



  addPickedShow(show: Show) {

    // this.shows.push(show);
    // this.router.navigate(["/myshows"]);

    const showData = show;

    this.http
      .post<{ message: string; show: Show }>(
        BACKEND_URL,
        showData
      )
      .subscribe(
        {
          next: responseData => {
            console.log(responseData);
            // this.router.navigate(["/"]);
            this.router.navigate(["/myshows"]);

          },
          error: error => {
            console.log("error on the add show.");
          }
        });
  }

  getShowByApiId(show: Show) {
    const showId = show.apiId;

    const url = BACKEND_URL + showId;

    this.http
      .get<{ message: string; show: Show }>(
        url)
      .subscribe(
        {
          next: responseData => {
            console.log(responseData);
            this.pickedShow = responseData.show;
            this.router.navigate([`/myshows/${showId}`]);
          },
          error: error => {
            console.log("error on the add show.");
          }
        });
  }

  updateShow(show: Show) {

    const url = BACKEND_URL + show.apiId;

    console.log("update show , url : ", url);
    console.log(" show : ", show);

    // this.http.put<{ message: string; show: Show }>(url , show)
    //   .subscribe(
    //     {
    //       next: responseData => {
    //         console.log(responseData);
    //         this.router.navigate(["/myshows"]);

    //       },
    //       error: error => {
    //         console.log("error on the delete show.");
    //       }
    //     });
  }

  deleteShow(apiId: string) {

    const url = BACKEND_URL + apiId;

    console.log(url);

    this.http.delete<{ message: string; show: Show }>(url)
      .subscribe(
        {
          next: responseData => {
            console.log(responseData);
            this.router.navigate(["/myshows"]);

          },
          error: error => {
            console.log("error on the delete show.");
          }
        });
  }
}

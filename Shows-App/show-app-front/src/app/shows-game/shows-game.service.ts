import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, map, take } from 'rxjs';
import { Show } from './shows-game-highlow/show.model';

const BACKEND_URL = environment.apiUrl + "/showsgame/";

interface ShowGet {
  dataObj:
  {
    items: { title: string, imDbRating: number, image: string }[]
  }
}


// arr.slice(Math.max(arr.length - 5, 0))

@Injectable({
  providedIn: 'root'
})
export class ShowsGameService {

  private shows: Show[] = [];
  private showsUpdated = new Subject<{ shows: Show[] }>();

  constructor(private http: HttpClient, private router: Router) { }


  getShowUpdateListener() {
    return this.showsUpdated.asObservable();
  }

  getShows(media: string) {
    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    const numberOfTakeShows = 70;
    this.http
      // .get<{ dataObj: any }>(
      .get<ShowGet>(
        BACKEND_URL + media
      )
      .pipe(
        map(showsData => {
          // console.log(showsData.dataObj);
          const showsDataSlice = showsData.dataObj.items.slice(0, Math.min(showsData.dataObj.items.length, numberOfTakeShows));
          return {
            shows: showsDataSlice.map(showDataObj => {
              return {
                title: showDataObj.title,
                rating: showDataObj.imDbRating,
                img: showDataObj.image,
              };
            })

          };
        })
      )
      .subscribe(transformedShowsData => {
        this.shows = transformedShowsData.shows;
        this.showsUpdated.next({
          shows: [...this.shows],
        });
      });
  }

}

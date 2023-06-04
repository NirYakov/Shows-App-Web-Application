import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + "/friends/";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  searchFriend(username: string) {

    const url = BACKEND_URL + `/${username}`;
    console.log(url);
    this.http.get(url).subscribe(
      {
        next: result => { console.log("Friend Found :)"); },
        error: error => { console.log("Error !!!") },
      });


  }

}

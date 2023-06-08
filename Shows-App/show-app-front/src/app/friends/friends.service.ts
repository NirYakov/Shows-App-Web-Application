import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';


const BACKEND_URL = environment.apiUrl + "/friends/";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  myUserName = localStorage.getItem("username");
  friends: string[] = [];

  private searchfriendStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSearchStatusListener() {
    return this.searchfriendStatusListener.asObservable();
  }

  getAllFriends() {
    const url = BACKEND_URL + `${this.myUserName}`;
    console.log(url);
    this.http.get(url).subscribe(
      {
        // next: result => { console.log("Friend Found :)", result); },
        // error: error => { console.log("Error !!!", error); },
      });

  }


  searchFriend(username: string) {

    // const myUserName = localStorage.getItem("username");

    if (this.myUserName !== username) {


      const url = BACKEND_URL + `search/${username}`;
      console.log(url);
      this.http.get(url).subscribe(
        {
          next: result => { console.log("Friend Found :)", result); this.searchfriendStatusListener.next(true); },
          error: error => { console.log("Error !!!", error); },
        });

    } else {

      console.log("Its you ...  -_+");
    }

  } // of({});

}

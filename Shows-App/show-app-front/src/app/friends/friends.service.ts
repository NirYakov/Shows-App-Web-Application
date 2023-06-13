import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Friend } from './friend';


const BACKEND_URL = environment.apiUrl + "/friends/";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  myUserName = localStorage.getItem("username");
  friends: { friendUsername: string, friendId: string }[] = [];

  private searchfriendStatusListener = new Subject<boolean>();
  private friendsStatusListener = new Subject<{ friendUsername: string, friendId: string }[]>();

  pickedFriend: Friend = { friendUsername: " OnSug ", friendId: "#$56" };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  getSearchStatusListener() {
    return this.searchfriendStatusListener.asObservable();
  }

  getFriendsStatusListener() {
    return this.friendsStatusListener.asObservable();
  }

  pickFriend(myFriend: Friend) {
    console.log(" Pick only mine friend");
    this.pickedFriend = myFriend;
    this.router.navigate([`/friend/${myFriend.friendUsername}`]);
  }

  getAllFriends() {
    const url = BACKEND_URL;
    console.log(url);
    this.http.get<{ message: string, friends: Friend[] }>(url).subscribe(
      {
        next: result => {
          console.log("Friends Found :)", result);
          this.friends = result.friends;
          this.friendsStatusListener.next(this.friends);
        },

        error: error => {
          console.log("Error !!!", error);

        },
      });

  }

  addfriend(friendUsername: string) {
    // some port call and then back with { friendUsername : <name> , friendId : <Id> }
    this.friends.push({ friendUsername: friendUsername, friendId: "101" });

    console.log(this.friends);

    this.http.post(BACKEND_URL + friendUsername, { friendName: friendUsername, friendId: "the friend id" }).subscribe({
      next: response => { console.log(response); },
      error: error => { console.log(error); },
    });


    this.router.navigate(["/myfriends"]);
  }

  goToFriendShows(friendUsername: string) {

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

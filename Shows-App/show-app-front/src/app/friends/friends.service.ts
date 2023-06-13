import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Friend } from './friend';
import { Show } from '../all-shows/show.model';


const BACKEND_URL = environment.apiUrl + "/friends/";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  myUserName = localStorage.getItem("username");
  friends: { friendUsername: string, friendId: string }[] = [];

  private searchfriendStatusListener = new Subject<{ friendId: string, found: boolean }>();
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

  addFriend(friend: Friend) {
    // some port call and then back with { friendUsername : <name> , friendId : <Id> }
    const friendName = friend.friendUsername, friendId = friend.friendId;

    this.friends.push(friend);

    console.log(this.friends);

    this.http.post(BACKEND_URL + friendName, { friendName, friendId }).subscribe({
      next: response => { console.log(response); this.router.navigate(["/myfriends"]); },
      error: error => { console.log(error); },
    });



  }

  goToFriendShows(friendUsername: string) {

  }


  searchFriend(username: string) {

    // const myUserName = localStorage.getItem("username");

    if (this.myUserName !== username) {


      const url = BACKEND_URL + `search/${username}`;
      console.log(url);
      this.http.get<{ message: string, found: boolean, friendId: string }>(url).subscribe(
        {
          next: result => {
            console.log("Friend Found :)", result);
            const friendIdFound = { friendId: result.friendId, found: result.found };
            console.log("Friend Found :)", friendIdFound);

            this.searchfriendStatusListener.next(friendIdFound);
          },
          error: error => { console.log("Error !!!", error); },
        });

    } else {

      console.log("Its you ...  -_+");
    }

  } // of({});

  private showsFriendStatusListener = new Subject<Show[]>();

  getFriendShowsStatusListener() {
    return this.showsFriendStatusListener.asObservable();
  }

  getAllFriendShows(friend: Friend) {

    const friendId = friend.friendId;
    console.log(friend);

    const url = BACKEND_URL + friendId;
    console.log(url);

    this.http
      .get<{ message: string; shows: Show[] }>(
        url)
      .subscribe(
        {
          next: responseData => {
            // this.router.navigate(["/"]);
            console.log(responseData);
            this.showsFriendStatusListener.next(responseData.shows);
          },
          error: error => {
            console.log(error);
          }
        });
  }


}

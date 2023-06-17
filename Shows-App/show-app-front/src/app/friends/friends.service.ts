import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  pickedFriend: Friend = { friendUsername: " OnSug ", friendId: "21na" };

  friendShows: Show[] = [];
  pickedShow: Show =
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
      type: "tv",
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
   It has survived not only five centuries,`,
      seasons: 6,
      apiId: "tt11002233"

    };;

  private showsFriendStatusListener = new Subject<Show[]>();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

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

  searchFriend(username: string) {

    // const myUserName = localStorage.getItem("username");

    console.log(username);

    if (this.myUserName !== username) {

      console.log("this.myUserName !== username ", this.myUserName !== username);

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


  getFriendShowsStatusListener() {
    return this.showsFriendStatusListener.asObservable();
  }

  getAllFriendShows(friend: Friend) {

    const friendId = friend.friendId;
    const url = BACKEND_URL + friendId;


    console.log(url);


    // const friendUsername = this.route.snapshot.routeConfig.path;
    // if (friend.friendUsername === friendUsername) { }

    this.http
      .get<{ message: string; shows: Show[] }>(
        url)
      .subscribe(
        {
          next: responseData => {
            // this.router.navigate(["/"]);
            if (responseData.shows) {

              console.log(responseData);
              this.friendShows = responseData.shows;
              this.showsFriendStatusListener.next(responseData.shows);
            }
          },
          error: error => {
            console.log(error);
          }
        });

  }

  getJointFriendShows(friend: Friend) {

    const friendId = friend.friendId;
    console.log(friend);

    const url = BACKEND_URL + 'joint/' + friendId;
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

  getDifferentFriendShows(friend: Friend) {

    const friendId = friend.friendId;
    console.log(friend);

    const url = BACKEND_URL + 'different/' + friendId;
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


  moveToSingleWithFriend(show: Show) {
    const showId = show.apiId;
    this.pickedShow = show;
    console.log("pickedShow ", this.pickedShow);
    this.router.navigate([`friend/show/${showId}`]);

  }

}

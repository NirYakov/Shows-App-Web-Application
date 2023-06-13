import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import { Subscription } from 'rxjs';
import { Friend } from '../friend';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit, OnDestroy {

  friends: { friendUsername: string, friendId: string }[] = [];
  private friendsStatusSub: Subscription;

  fakeFriends = [
    "Friend_Name_-17",
    "Friend_Name_-11",
    "Friend_Name_-14",
    "Friend_Name_-10",
    "Friend_Name_-19",
    "Friend_Name_-15"
  ];

  constructor(private friendService: FriendsService) { }
  ngOnDestroy(): void {
    this.friendsStatusSub.unsubscribe();
  }

  ngOnInit() {
    // this.friends = this.fakeFriends;
    this.friends = this.friendService.friends;

    this.friendsStatusSub = this.friendService.getFriendsStatusListener().subscribe({
      next: friendsResults => {
        this.friends = friendsResults;
        console.log("Friends in the right block.");
      },
      error: error => { console.log("Error friends list component.", error); },
    });

    this.getAndFillAllFriends();
  }

  getAndFillAllFriends() {
    this.friendService.getAllFriends();
  }

  pickFriend(myFriend: Friend) {
    this.friendService.pickFriend(myFriend);
    console.log("myFriend", myFriend);
  }

}

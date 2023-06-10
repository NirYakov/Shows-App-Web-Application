import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends: { friendUsername: string, friendId: string }[] = [];

  fakeFriends = [
    "Friend_Name_-17",
    "Friend_Name_-11",
    "Friend_Name_-14",
    "Friend_Name_-10",
    "Friend_Name_-19",
    "Friend_Name_-15"
  ];

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    // this.friends = this.fakeFriends;
    this.friends = this.friendService.friends;
  }

  getAndFillAllFriends() {

  }

}

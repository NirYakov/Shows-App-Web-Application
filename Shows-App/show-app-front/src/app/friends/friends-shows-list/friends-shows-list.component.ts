import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends-shows-list',
  templateUrl: './friends-shows-list.component.html',
  styleUrls: ['./friends-shows-list.component.css']
})
export class FriendsShowsListComponent implements OnInit {

  friend: Friend = { friendUsername: " On Sug ", friendId: "friendId" };

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    // algorit to make sure that the picked friend show here :)
    this.friend = this.friendService.pickedFriend;
    console.log("this.friend", this.friend);
  }

}

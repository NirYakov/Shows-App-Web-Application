import { Component, OnDestroy, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Show } from 'src/app/all-shows/show.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-shows-list',
  templateUrl: './friends-shows-list.component.html',
  styleUrls: ['./friends-shows-list.component.css']
})
export class FriendsShowsListComponent implements OnInit, OnDestroy {


  shows: Show[] = [];

  friend: Friend = { friendUsername: " On Sug ", friendId: "friendId" };

  private friendShowsStatusSub: Subscription;

  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    // algorit to make sure that the picked friend show here :)
    this.friend = this.friendService.pickedFriend;
    // console.log("this.friend", this.friend);

    this.friendShowsStatusSub = this.friendService.getFriendShowsStatusListener().subscribe({
      next: showsResult => {
        this.shows = showsResult;
      },
      error: error => {
        console.log(error);
      }

    });

    this.friendService.getAllFriendShows(this.friend);

  }

  getAllFriendShows() {
    this.friendService.getAllFriendShows(this.friend);
  }

  jointShows() {
    this.friendService.getJointFriendShows(this.friend);
  }

  differentShows() {
    this.friendService.getDifferentFriendShows(this.friend);
  }


  ngOnDestroy(): void {
    this.friendShowsStatusSub.unsubscribe();
  }

}

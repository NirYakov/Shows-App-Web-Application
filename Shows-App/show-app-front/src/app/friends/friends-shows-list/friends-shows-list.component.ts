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



  showsOrigin: Show[];

  buttonAll = 0;
  buttonMovie = 1;
  buttonTv = 2;

  buttonSelectedTypes = 0;

  // buttonSelected = 0;

  buttonAllOpertion = 0;
  buttonJointOpertion = 1;
  buttonDifferentOpertion = 2;

  buttonSelectedOpertion = 0;




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
        this.showsOrigin = this.shows = showsResult;
      },
      error: error => {
        console.log(error);
      }

    });

    this.friendService.getAllFriendShows(this.friend);

  }

  getAllFriendShows() {
    this.friendService.getAllFriendShows(this.friend);
    this.buttonSelectedOpertion = this.buttonAllOpertion;
    this.buttonSelectedTypes = this.buttonAll;
  }

  jointShows() {
    this.friendService.getJointFriendShows(this.friend);
    this.buttonSelectedOpertion = this.buttonJointOpertion;
    this.buttonSelectedTypes = this.buttonAll;
  }

  differentShows() {
    this.friendService.getDifferentFriendShows(this.friend);
    this.buttonSelectedOpertion = this.buttonDifferentOpertion;
    this.buttonSelectedTypes = this.buttonAll;
  }


  ngOnDestroy(): void {
    this.friendShowsStatusSub.unsubscribe();
  }


  onClickType(btnSelect: number) {

    if (!this.showsOrigin || this.showsOrigin.length == 0) {
      return;
    }

    if (btnSelect === this.buttonAll && this.buttonSelectedTypes !== this.buttonAll) {
      this.shows = this.showsOrigin;
    }
    else if (btnSelect === this.buttonMovie && this.buttonSelectedTypes !== this.buttonMovie) {
      this.shows = this.showsOrigin.filter(show => show.type === "movie");

    }
    else if (btnSelect === this.buttonTv && this.buttonSelectedTypes !== this.buttonTv) {

      this.shows = this.showsOrigin.filter(show => show.type === "tv");
    }

    this.buttonSelectedTypes = btnSelect;
    // do stuff ....

  }

  onAddShowClicked() {
    console.log("Clicked ... !! on add ... !!");
  }

  // can be with pic of the friend or the logged in user
  moveToSingleWithFriend($event: Show) {

    const show = $event;
    // this.showService.moveToSinglePage(show);

  }

  // can be with pic of the friend or the logged in user
  // moveToSingleWithFriend($event: Show) {

  //   const show = $event;
  //   this.showService.moveToSinglePage(show);

  //   // showname
  //   const showName = show.title;
  //   this.router.navigate([`/myshows/${showName}`]);
  //   this.pickedShow = show;

  // }

}

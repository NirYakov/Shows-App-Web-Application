import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/friends/friends.service';
import { Show } from '../show.model';
import { Friend } from 'src/app/friends/friend';

@Component({
  selector: 'app-single-show-view-friend',
  templateUrl: './single-show-view-friend.component.html',
  styleUrls: ['./single-show-view-friend.component.css']
})
export class SingleShowViewFriendComponent implements OnInit {

  show: Show =
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

    };

  userShow: Friend;

  constructor(private route: ActivatedRoute, private friendsService: FriendsService) { }

  ngOnInit() {
    this.SearchAndFoundShow();
    this.userShow = this.friendsService.pickedFriend;
  }

  SearchAndFoundShow() {
    const showId = this.route.snapshot.paramMap.get('apiShowId');
    const foundInFriendShow = this.friendsService.friendShows.find(show => show.apiId === showId);

    this.show = this.friendsService.pickedShow;

    if (!foundInFriendShow) {
      // this.userShow = this.friendsService.pickedFriend;
      this.userShow = { friendUsername: this.friendsService.myUserName, friendId: "n/a" };
      // return;
    }

    // this.show = this.friendsService.show
  }

}

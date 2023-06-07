import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  friendName = "Friend_Name_-15";

  @Input() friend: string = this.friendName;


  minchProfilePic = `https://api.dicebear.com/6.x/micah/svg?seed=Felix2-_`;


  constructor() { }

  ngOnInit() {
  }

  index: number;


  fillFriend() {
    this.minchProfilePic = `https://api.dicebear.com/6.x/micah/svg?seed=${this.friend}${this.index}`;
    this.index++;
    console.log("clicked fillFriend()", this.minchProfilePic);
  }

}

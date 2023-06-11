import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  friendName = "Friend_Name_-15";

  @Input() friend: string = this.friendName;

  // @Input() clickedFunc = (str: string) => {

  //   console.log("Hellowwwwww ");

  // };

  @Output() onSuggest: EventEmitter<string> = new EventEmitter();

  suggestionWasClicked(clickedEntry: string): void {
    this.onSuggest.emit(clickedEntry);
  }

  @Input() buttonLabel: string = "Pick";


  minchProfilePic = `https://api.dicebear.com/6.x/micah/svg?seed=Felix2-_`;



  constructor() { }

  ngOnInit() {
    this.fillFriend();
  }

  index: number = 0;

  fillFriend() {
    this.minchProfilePic = `https://api.dicebear.com/6.x/micah/svg?seed=${this.friend}`;
    console.log("clicked fillFriend()", this.minchProfilePic);
    // this.clickedFunc(this.friend);
  }

  // fillFriend() {
  //   this.minchProfilePic = `https://api.dicebear.com/6.x/micah/svg?seed=${this.friend}${this.index}`;
  //   this.index++;
  //   console.log("clicked fillFriend()", this.minchProfilePic);
  //   this.clickedFunc(`${this.friend}${this.index}`);
  // }

}

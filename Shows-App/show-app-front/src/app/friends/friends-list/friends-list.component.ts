import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends: string[] = [
    "Friend_Name_-17",
    "Friend_Name_-11",
    "Friend_Name_-14",
    "Friend_Name_-10",
    "Friend_Name_-19",
    "Friend_Name_-15"
  ];

  constructor() { }

  ngOnInit() {
  }

}

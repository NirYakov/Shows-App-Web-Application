import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-show',
  templateUrl: './single-show.component.html',
  styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {

  showTitle = "Show Title";
  shortAboutShow = "About the show ...";
  myShowReview = "i think its great show , liked the story and characters"
  number = 2;

  canEdit: boolean = true; // only the user logged in can edit his review

  isTextArea: boolean = false;

  list = [0, 1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

  onEditReview() {
    this.isTextArea = !this.isTextArea;
  }



}

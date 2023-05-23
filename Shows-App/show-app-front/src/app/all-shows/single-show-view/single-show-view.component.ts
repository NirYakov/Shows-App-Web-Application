import { Component, OnInit } from '@angular/core';

// ClipCardComponent

@Component({
  selector: 'app-single-show-view',
  templateUrl: './single-show-view.component.html',
  styleUrls: ['./single-show-view.component.css']
})
export class SingleShowViewComponent implements OnInit {

  constructor() { }

  visibleHalfMoon = true;

  onClickStar() {

    console.log("Starrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

    this.visibleHalfMoon = !this.visibleHalfMoon;

  }

  ngOnInit() {
  }

}

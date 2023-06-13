import { Component, Input, OnInit } from '@angular/core';
import { Show } from '../show.model';

@Component({
  selector: 'app-show-list-only',
  templateUrl: './show-list-only.component.html',
  styleUrls: ['./show-list-only.component.css']
})
export class ShowListOnlyComponent implements OnInit {

  @Input() shows: Show[] = [];

  constructor() { }

  ngOnInit() {
  }

  numberToNumEmoji(rating: number) {

    const mapNumToNumEmoji = {
      0: '0️⃣',
      1: '1️⃣ ⭐',
      2: '2️⃣ ⭐ ⭐',
      3: '3️⃣ ⭐ ⭐ ⭐',
      4: '4️⃣ ⭐ ⭐ ⭐ ⭐',
      5: '5️⃣ ⭐ ⭐ ⭐ ⭐ ⭐'
    }

    return mapNumToNumEmoji[rating];
  }


  moveToSingle(show: Show) {


    // this.showService.moveToSinglePage(show);

  }
}

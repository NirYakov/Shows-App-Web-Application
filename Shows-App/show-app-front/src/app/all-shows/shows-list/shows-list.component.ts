import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { Show } from '../show.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent implements OnInit, OnDestroy {

  showsOrigin: Show[];

  buttonAll = 0;
  buttonMovie = 1;
  buttonTv = 2;

  buttonSelected = 0;

  shows: Show[];

  showsPicked: Show = null;

  private showsStatusSub: Subscription;

  constructor(public showService: ShowsService) { }

  ngOnDestroy(): void {
    this.showsStatusSub.unsubscribe();
  }
  // constructor(public showService: ClipsService) { }
  // constructor() { }


  ngOnInit(): void {
    //    throw new Error('Method not implemented.');
    console.log("On init");
    // this.fillAllShows();
    // this.initShows();

    console.log(this.shows);

    console.log("showService? : ", this.showService);

    ////////////////////////////////////////////////////////////////


    this.showsStatusSub = this.showService.getShowsStatusListener().subscribe(results => {
      this.shows = this.showsOrigin = results;
      console.log(" in the listener ", results);
    });


    this.showService.getAllShows();




  }


  initShows() {
    this.showService.getAllShows();
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

  moveToSingle(showsPickedFromList: Show) {


    console.log("Here clicked on move to singleeee ");
    console.log("Here clicked on move to singleeee ", this);
    console.log("Here clicked on move to singleeee showshowshowshow ", this.showsPicked);
    console.log("Here clicked on move to singleeee showshowshowshow ", showsPickedFromList);

    // this.showService.moveToSinglePage(show);

  }

  onClickType(btnSelect: number) {

    if (!this.showsOrigin || this.showsOrigin.length == 0) {
      return;
    }

    if (btnSelect === this.buttonAll && this.buttonSelected !== this.buttonAll) {
      this.shows = this.showsOrigin;
    }
    else if (btnSelect === this.buttonMovie && this.buttonSelected !== this.buttonMovie) {
      this.shows = this.showsOrigin.filter(show => show.type === "movie");

    }
    else if (btnSelect === this.buttonTv && this.buttonSelected !== this.buttonTv) {

      this.shows = this.showsOrigin.filter(show => show.type === "tv");
    }

    this.buttonSelected = btnSelect;
    // do stuff ....

  }

  fillAllShows() {
    this.showService.getAllShows();
    console.log(this.shows);
    console.log(this.showService.getAllShows());

  }


  onAddShowClicked() {
    console.log("onAddShowClicked()");

    // this.router.navigateByUrl('/user');
  }

}

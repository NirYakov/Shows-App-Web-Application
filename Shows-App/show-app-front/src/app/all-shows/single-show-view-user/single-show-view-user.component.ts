import { Component, OnInit } from '@angular/core';
import { Show } from '../show.model';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-single-show-view-user',
  templateUrl: './single-show-view-user.component.html',
  styleUrls: ['./single-show-view-user.component.css']
})
export class SingleShowViewUserComponent implements OnInit {

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

  editSave = "Edit";

  constructor(private route: ActivatedRoute, private showsService: ShowsService) { }

  ngOnInit() {
    const showId = this.route.snapshot.paramMap.get('apiShowId');
    const foundShow = this.showsService.shows.find(show => show.apiId === showId);
    if (foundShow) {
      this.show = foundShow;
    }
    else {
      // search show on the server and give it back to look at
    }

    console.log("this.show ", this.show);
    console.log("showId ", showId);
    console.log("this.showsService.shows ", this.showsService.shows);

  }

  onDeleteWasClicked(apiId: string) {
    this.showsService.deleteShow(apiId);
  }

  onUpdateWasClicked(apiId: string) {
    if (this.editSave === "Edit") {
      this.inEditMode();
    } else  // this.editSave === "Save"
    {
      this.inSaveMode();
    }

  }

  inSaveMode() {
    this.editSave = "Edit";
  }

  editMode = false;

  inEditMode() {
    this.editMode = true;
    // this.show.rating = 1; // tesTing . Nice to have!!
    this.editSave = "Save";
    this.onStarClick(this.show.rating - 1);


  }

  // stars edit feature !!

  stars = [false, false, false, false, false];

  starsNumber = 0;
  onStarClick(idx: number) {
    this.starsNumber = idx;

    if (idx === 0 && this.stars[0] === false) {
      this.stars[0] = true;
      return;
    }

    if (idx === 0 && this.stars[1] === false) {
      this.stars[0] = false;
      return;
    }


    for (let i = 0; i < this.stars.length; i++) {
      if (i <= idx) {
        this.stars[i] = true;

      } else {
        this.stars[i] = false;

      }
    }
  }

}

/*

As a few people have mentioned, the parameters in paramMap should be accessed using the common MapAPI:

To get a snapshot of the params, when you don't care that they may change:

this.bankName = this.route.snapshot.paramMap.get('bank');
To subscribe and be alerted to changes in the parameter values (typically as a result of the router's navigation)

this.route.paramMap.subscribe( paramMap => {
    this.bankName = paramMap.get('bank');
})

*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowsService } from '../shows.service';
import { Show } from '../show.model';



@Component({
  selector: 'app-clip-create',
  templateUrl: './clip-create.component.html',
  styleUrls: ['./clip-create.component.css']
})
export class ClipCreateComponent implements OnInit, OnDestroy {

  subCategories!: Subscription;


  textAreaValue: string = "";
  inputValue: string = "";

  // searchShowForm: FormControl;
  // myReviewText: FormControl;

  constructor(private clipsService: ClipsService, private route: ActivatedRoute, private http: HttpClient, private showsService: ShowsService) {

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  form: FormGroup;

  ngOnInit() {

    this.form = new FormGroup({
      searchShowForm: new FormControl('', { validators: [Validators.required] }),
      myReviewText: new FormControl('', { validators: [] }),
    });


    // this.searchShowForm = new FormControl('', { validators: [Validators.required] });
    // this.myReviewText = new FormControl('', { validators: [] });

  }

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


  clearValueFunc() {

    // this.searchShowForm.setValue('');

  }


  value = 'Clear me';



  /////// Some tests

  fakeSearchRsults: Show[];

  fillDataResults() {

    // const searchShow = "inception 21";
    const searchShow = this.form.get("searchShowForm").value;

    console.log("Search Show : ", searchShow);

    this.http.get<any>(`http://localhost:3000/api/test/search/${searchShow}`).subscribe(
      {
        next: result => {
          this.fakeSearchRsults = result.responseApi.results.map(show => {
            console.log(show);
            return {
              title: show.title,
              rating: show.imDbRating,
              img: show.image,
              type: "tv",
              review: show.description,
              seasons: show.seasons,
              minutes: show.minutes
            };
          });
        },
        error: error => {
          // error

          /////////////// fake fill data

          console.log(error);

          //  this.fakeSearchRsults = this.showsService.showsStaticData;
        }
      }
    );

  }

  pickedShow: Show = null;

  onPickShow(show: Show) {

    const pickedShow = this.fakeSearchRsults.find(aryShow => show.title === aryShow.title);

    if (pickedShow) {
      this.fakeSearchRsults = [];
      console.log(pickedShow);

      this.pickedShow = pickedShow;

    }
  }

  onSave() {

    if (!this.pickedShow) {
      console.log("Form Not Valid");
      console.log(this.form.value);
      return;
    }

    console.log("Form Valid");
    console.log(this.form.value);
    console.log(this.pickedShow);

    console.log("my rating stars:", this.starsNumber);

    let showStars = 0

    for (let i = this.stars.length - 1; i >= 0; i--) {
      if (this.stars[i]) {
        showStars = i + 1;
        break;
      }
    }



    console.log("my SHOW STARS rating stars:", showStars);

    const myShow = { ...this.pickedShow };

    myShow.review = this.form.value.myReviewText;
    myShow.rating = showStars;

    console.log(myShow);

    this.showsService.addPickedShow(myShow);
  }

}

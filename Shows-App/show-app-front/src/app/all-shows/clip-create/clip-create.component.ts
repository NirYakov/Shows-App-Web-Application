import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-clip-create',
  templateUrl: './clip-create.component.html',
  styleUrls: ['./clip-create.component.css']
})
export class ClipCreateComponent implements OnInit, OnDestroy {

  subCategories!: Subscription;


  textAreaValue: string = "";
  inputValue: string = "";

  searchShowForm: FormControl;
  myReviewText: FormControl;

  constructor(private clipsService: ClipsService, private route: ActivatedRoute, private http: HttpClient) {

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }



  ngOnInit() {

    this.searchShowForm = new FormControl('', { validators: [Validators.required] });
    this.myReviewText = new FormControl('', { validators: [] });
  }

  stars = [false, false, false, false, false];


  onStarClick(idx) {

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

    this.searchShowForm.setValue('');

  }


  value = 'Clear me';



  /////// Some tests

  fakeSearchRsults: (string)[] = [];

  fillDataResults() {

    const searchShow = "inception 21";

    this.http.get<any>(`http://localhost:3000/api/test/search/${searchShow}`).subscribe(
      {
        next: result => {
          this.fakeSearchRsults = result.responseApi.results.map(show => show.title);
        },
        error: error => {
          this.fakeSearchRsults = ["Breaking bad", "The Blacklist", "Rick And Morty", "Inception"];
        }
      }
    );

    this.fakeSearchRsults = ["Breaking bad", "The Blacklist", "Rick And Morty", "Inception"];

  }



  myShow = {
    title: "Breaking Bad",
    img: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
    rating: 9.4,
  };

}

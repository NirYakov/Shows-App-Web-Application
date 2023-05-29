import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { Show } from '../show.model';

// ClipCardComponent

@Component({
  selector: 'app-single-show-view',
  templateUrl: './single-show-view.component.html',
  styleUrls: ['./single-show-view.component.css']
})
export class SingleShowViewComponent implements OnInit {

  constructor(private showsService: ShowsService) { }

  visibleHalfMoon = true;

  onClickStar() {

    console.log("Starrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

    this.visibleHalfMoon = !this.visibleHalfMoon;

  }

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

    };



  ngOnInit() {

    const pickedShow = this.showsService.pickedShow;


    if (pickedShow) {
      this.show = pickedShow;


    }


    // Array.from({length: 10}, (_, i) => i + 1)

    // [...Array(10).keys()]

  }

}

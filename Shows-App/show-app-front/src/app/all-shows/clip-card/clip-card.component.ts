import { Component, Input, OnInit } from '@angular/core';
import { ShowGame } from 'src/app/shows-game/shows-game-highlow/showGame.model';
import { Show } from '../show.model';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.component.html',
  styleUrls: ['./clip-card.component.css']
})
export class ClipCardComponent implements OnInit {

  stars = [];

  @Input() show: ShowGame =
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
    };

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
    const pickedShow = this.showsService.pickedShow;

    if (pickedShow) {
      this.show = pickedShow;
    }

    this.stars = Array.from({ length: Math.floor(this.show.rating) }, (_, i) => i + 1);

    console.log(this.stars);
    console.log(this.show.rating);
    console.log(this.show);

  }



}

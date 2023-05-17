import { Component, Input, OnInit } from '@angular/core';
import { Show } from 'src/app/shows-game/shows-game-highlow/show.model';

@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.component.html',
  styleUrls: ['./clip-card.component.css']
})
export class ClipCardComponent implements OnInit {

  baseUriYt = "https://www.youtube.com/embed/";

  @Input() show: Show =
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
    };

  constructor() { }

  ngOnInit() {
  }

}

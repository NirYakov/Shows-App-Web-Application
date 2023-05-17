import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClipsService } from '../clips.service';



@Component({
  selector: 'app-clip-create',
  templateUrl: './clip-create.component.html',
  styleUrls: ['./clip-create.component.css']
})
export class ClipCreateComponent implements OnInit, OnDestroy {
  link = '';

  selectedValue!: string;
  setCategoryies = new Set();


  subCategories!: Subscription;

  constructor(private clipsService: ClipsService, private route: ActivatedRoute) {

  }

  youtubeUrl(link: string) {
    const ytLink = this.clipsService.returnVideoUrl(link.split("=")[1]);;
    console.log(ytLink);

    return ytLink;
  }

  ngOnDestroy(): void {
    this.subCategories.unsubscribe();
  }


  ngOnInit() {

    this.subCategories = this.clipsService.getCategoryUpdateListener().subscribe(cate => {
      this.setCategoryies = cate;
    });

    const routId = this.route.snapshot.params['id'];
    this.clipsService.getClips(routId);
  }


  AddNewClip() {
    console.log("HERERE POST ???? AAA");
    if (this.selectedValue) {
      console.log(this.selectedValue, this.link);
      // const routId = this.route.snapshot.params['id'] || Math.floor(Math.random() * 50_000);
      const routId = this.route.snapshot.params['id'];
      this.clipsService.addClip(this.selectedValue, this.link.split("=")[1], routId);
    }
    else {
      console.log("Not have Clip Value");
    }
  }
}

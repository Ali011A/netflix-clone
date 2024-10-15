import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent  implements OnChanges{
  @Input() bannerTitle='';
  @Input() bannerOverview='';
  @Input() key = '6kUPkbIshyg';
  constructor(private sanitizer: DomSanitizer,private _Router:Router) { }
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.key}`)

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.key}`);
    }
  }
  goToDetails(id: number) {
    this._Router.navigate(['/details', id]);
  }
  }


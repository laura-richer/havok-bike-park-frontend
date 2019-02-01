import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer-images',
  templateUrl: './footer-images.component.html'
})
export class FooterImagesComponent implements OnInit {

  public facebookPhotos;
  public fbAPI: string = 'https://graph.facebook.com/';
  public apiKey: string = 'EAAGZBsrRFgEABAAVKcelp8V5iXtuUFTr3itSRstvcT5TvU9ZCH7mVvDA3yRnEzwJfrhN2BjlBLLZBN1WxgG1mGWDJDD0xxVUkb8NE2ZAr9hzcFkdegv2GVvzadcQZBBqdST42Flhh3r8nNGPIaUjPIfd9fNyEhIAMmZB1PyEynlgZDZD';
  public media;

  constructor(private apiConnections: ApiConnections) {

    // set empty array
    this.media = [];
  }

  ngOnInit() {

    // connect to Facebook API to get uploaded photos
     this.apiConnections.getFacebookList('photos?type=uploaded&limit=4&access_token=')
      .subscribe(facebookPhotos => {

        this.facebookPhotos = facebookPhotos;
        this.facebookPhotos = this.facebookPhotos.data;

        for (var i = 0; i < this.facebookPhotos.length; i++) {
          this.media.push({
            'id': this.facebookPhotos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'type':'photo'
          });
        }
      });
  }
}

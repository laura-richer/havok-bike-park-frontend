import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer-images',
  templateUrl: './footer-images.component.html'
})
export class FooterImagesComponent implements OnInit {

  public facebookPhotos;
  public fbAPI;
  public apiKey;
  public media;

  constructor(private apiConnections: ApiConnections) {
    this.fbAPI = 'https://graph.facebook.com/'
    this.apiKey = 'EAAGZBsrRFgEABAM4QFDXIMI6OqZAQJ2VaRSRyHjz01KFPZCThYOziH955CzaTRvvq36HaU67AsaxURvGBvtaCgB8NxP4hsh6AW2pj10mKvv4um0VNVjyg3WT1ZBDwcmcynAJW3nPtxGvKIQEO6ScGzZBAbYGoW08kCGMJHwabngZDZD';
    this.media = [];
  }

  ngOnInit() {
     this.apiConnections.getFacebookList("photos?type=uploaded&limit=4&access_token=")
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

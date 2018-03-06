import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {

  public facebookPhotos;
  public facebookVideos;
  public videoThumbnails;
  public media: any;
  public videoIds: any;
  private fbAPI;
  private apiKey;

  constructor(private apiConnections: ApiConnections) {
    this.fbAPI = 'https://graph.facebook.com/'
    this.apiKey = 'EAACEdEose0cBAPJiWjFXgB7nC43zZC2DH2JWlogSg7kyGOOdjBLaLpLo4lL9wVH3ZA9qplpMglZAUB192JQ1bi4QeWAtMMufZCUjZAIwTmn36lBZBzb8MkGYmyXjVQ0ZBnD9duMZBtTIZC0NPmQxXhVPDdAEfIhrHi0ND4N5FCydUQ32RtoSdtEhDZASxjcBhImBQZD';
    this.media = [];
    this.videoIds = [];
  }

  ngOnInit() {
    this.apiConnections.getFacebookList("photos?type=uploaded&access_token=")
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

    this.apiConnections.getFacebookList("videos?access_token=")
      .subscribe(facebookVideos => {

        this.facebookVideos = facebookVideos;
        this.facebookVideos = this.facebookVideos.data;

        for (var i = 0; i < this.facebookVideos.length; i++) {
          this.media.push({
            'id': this.facebookVideos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'type':'video'
          });
        }
      });

    console.log(this.media);
    //this.orderMedia();
  }

  orderMedia() {
    this.media = this.media.slice(0);
    this.media.sort(function(a,b) {
      return a.created_time - b.created_time;
    });
  }
}

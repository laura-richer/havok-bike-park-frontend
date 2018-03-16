import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';
import { BodyScrollService } from '../../services/body-scroll.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {

  public facebookPhotos;
  public facebookVideos;
  public media: any;
  public mediaSorted: any;
  private fbAPI;
  private apiKey;

  private modalShow: boolean = false;
  private modalAnimate: boolean = false;
  private modalSrc;
  private modalType;
  private embedHtml;

  // Modal sizing
  private mediaHeight: any;
  private mediaWidth: any;
  private position: any;

  constructor(
    private apiConnections: ApiConnections,
    private bodyScrollService: BodyScrollService) {
    this.fbAPI = 'https://graph.facebook.com/'
    this.apiKey = 'EAAGZBsrRFgEABAM4QFDXIMI6OqZAQJ2VaRSRyHjz01KFPZCThYOziH955CzaTRvvq36HaU67AsaxURvGBvtaCgB8NxP4hsh6AW2pj10mKvv4um0VNVjyg3WT1ZBDwcmcynAJW3nPtxGvKIQEO6ScGzZBAbYGoW08kCGMJHwabngZDZD';
    this.media = [];
    this.mediaSorted = [];
  }

  ngOnInit() {

    // get 25 latest facebook images
    this.apiConnections.getFacebookList("photos?type=uploaded&access_token=")
      .subscribe(facebookPhotos => {

        this.facebookPhotos = facebookPhotos;
        this.facebookPhotos = this.facebookPhotos.data;

        for (var i = 0; i < this.facebookPhotos.length; i++) {
          this.media.push({
            'id': this.facebookPhotos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'formatted_time': Date.parse(this.facebookPhotos[i].created_time),
            'type':'photo'
          });
        }
      });

    // get 25 latest facebook Videos
    setTimeout(() =>
      this.apiConnections.getFacebookList("videos?access_token=")
      .subscribe(facebookVideos => {
        this.facebookVideos = facebookVideos;
        this.facebookVideos = this.facebookVideos.data;

        for (var i = 0; i < this.facebookVideos.length; i++) {
          this.media.push({
            'id': this.facebookVideos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'formatted_time': Date.parse(this.facebookPhotos[i].created_time),
            'type':'video'
          });
        }
      })
    , 100);

    // Sort array and order by latest first
    setTimeout(() => this.mediaSorted = this.media.sort(this.sortNumber), 300);
    setTimeout(() => this.mediaSorted = this.mediaSorted.reverse(), 310);
    //setTimeout(() => console.log(this.mediaSorted), 500);
  }

  sortNumber(a, b) {
    return a.formatted_time - b.formatted_time;
  }

  // Modal functionality
  show(src, type): void {
    this.modalSrc = src;
    this.modalType = type;

    if (this.modalType == 'video') {
      this.apiConnections.getFacebookMediaEmbed(this.modalSrc, 'embed_html')
      .subscribe(facebookVideoEmbed => {
        this.embedHtml = facebookVideoEmbed;
        this.embedHtml = this.embedHtml.embed_html;

        //Testing getting the iframe size
        //this.mediaWidth = document.getElementsByTagName('iframe[0]').getAttribute('width');
        //console.log(document.getElementsByTagName('iframe')[0].getAttribute('offsetHeight'));
        //console.log(this.mediaWidth);
      });
    } else {
      this.apiConnections.getFacebookMediaEmbed(this.modalSrc, 'height,width')
      .subscribe(facebookPhotoEmbed => {
        this.embedHtml = facebookPhotoEmbed;
        this.mediaHeight = this.embedHtml.height;
        this.mediaWidth = this.embedHtml.width;

        // Work out modal orintation
        if (this.mediaHeight > this.mediaWidth) {
          this.position = 'portrait';
        } else if (this.mediaWidth > this.mediaHeight) {
          this.position = 'landscape';
        }
      });
    }

    setTimeout(() => this.modalShow = true, 400);


    // get width of current modal
    // This needs testing when facebook API working again
    if (this.position == 'portrait') {
      this.mediaWidth = document.getElementById('image-modal').getAttribute('width');
      console.log(this.mediaWidth);
      this.mediaWidth = this.mediaWidth / 2;
    }

    setTimeout(() => this.modalAnimate = true, 500);
    this.bodyScrollService.removeScroll();
  }

  hide(): void {
    this.modalShow = false;
    setTimeout(() => this.modalAnimate = false, 10);
    this.bodyScrollService.addScroll();
  }

  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}

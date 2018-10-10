import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';
import { BodyScrollService } from '../../services/body-scroll.service';
import { ModalOrientation }  from '../../services/modal-orientation.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {

  // Facebook vars
  public apiKey: string = 'EAAGZBsrRFgEABAAVKcelp8V5iXtuUFTr3itSRstvcT5TvU9ZCH7mVvDA3yRnEzwJfrhN2BjlBLLZBN1WxgG1mGWDJDD0xxVUkb8NE2ZAr9hzcFkdegv2GVvzadcQZBBqdST42Flhh3r8nNGPIaUjPIfd9fNyEhIAMmZB1PyEynlgZDZD';
  public fbAPI: string = 'https://graph.facebook.com/';
  public facebookPhotos;
  public facebookVideos;
  public media: any;
  public mediaSorted: any;

  // Modal vars
  public embedHtml;
  public modalAnimate: boolean = false;
  public modalShow: boolean = false;
  public modalSrc;
  public modalType;

  // Modal sizing
  public mediaHeight: any;
  public mediaWidth: any;
  public position: any;

  constructor(
    private apiConnections: ApiConnections,
    private bodyScrollService: BodyScrollService,
    private modalOrientation: ModalOrientation,
    private titleService: Title) {

    // Set empty arrays
    this.media = [];
    this.mediaSorted = [];
  }

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Media | Havok Bike Park');

    // get 25 latest facebook images
    this.apiConnections.getFacebookList('photos?type=uploaded&access_token=')
      .subscribe(facebookPhotos => {

        this.facebookPhotos = facebookPhotos['data'];

        // Add to generic media array
        for (var i = 0; i < this.facebookPhotos.length; i++) {
          this.media.push({
            'id': this.facebookPhotos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'formatted_time': Date.parse(this.facebookPhotos[i].created_time),
            'type':'photo'
          });
        }
      },
      error => console.log(error),
      () => this.getVideos());
  }

  getVideos() {
    this.apiConnections.getFacebookList('videos?access_token=')
      .subscribe(facebookVideos => {
        this.facebookVideos = facebookVideos['data'];

        // Add to generic media array
        for (var i = 0; i < this.facebookVideos.length; i++) {
          this.media.push({
            'id': this.facebookVideos[i].id,
            'created_time': this.facebookPhotos[i].created_time,
            'formatted_time': Date.parse(this.facebookPhotos[i].created_time),
            'type':'video'
          });
        }
      });

    setTimeout(() => this.mediaSorted = this.media.sort(this.sortNumber), 500);
    setTimeout(() => this.mediaSorted = this.mediaSorted.reverse(), 510);
  }

  // Sort by date order
  // Need to move to service
  sortNumber(a, b) {
    return a.formatted_time - b.formatted_time;
  }

  // Position modal for portrait images
  modalPosition(position) {
    if (position == 'portrait') {
      this.mediaWidth = document.getElementById('modal').offsetWidth;
      this.mediaWidth = this.mediaWidth / 2;
    }
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

        // Get dimensions & orientation of modal
        this.position = this.modalOrientation.getDimensions('width', this.embedHtml);

        // Trigger modal functionality
        setTimeout(() => this.modalShow = true, 400);
        setTimeout(() => this.modalAnimate = true, 500);
        this.bodyScrollService.removeScroll();
      });
    } else {
      this.apiConnections.getFacebookMediaEmbed(this.modalSrc, 'height,width')
      .subscribe(facebookPhotoEmbed => {
        this.embedHtml = facebookPhotoEmbed;
        this.mediaHeight = this.embedHtml.height;
        this.mediaWidth = this.embedHtml.width;

        // Get orientation of modal
        this.position = this.modalOrientation.getImageOrientation(this.mediaWidth, this.mediaHeight);

        // Trigger modal functionality
        setTimeout(() => this.modalShow = true, 400);
        setTimeout(() => this.modalPosition(this.position), 450);
        setTimeout(() => this.modalAnimate = true, 500);
        this.bodyScrollService.removeScroll();
      });
    }
  }

  // Hide modal
  hide(): void {
    this.modalShow = false;
    setTimeout(() => this.modalAnimate = false, 10);
    this.bodyScrollService.addScroll();
  }

  // Hide on click outside the modal area
  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}

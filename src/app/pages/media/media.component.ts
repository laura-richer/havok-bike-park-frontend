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
    setTimeout(() => this.modalShow = true, 10);
    setTimeout(() => this.modalAnimate = true, 20);
    this.bodyScrollService.removeScroll();

    if (this.modalType == 'video') {
      this.apiConnections.getFacebookVideoEmbed(this.modalSrc)
      .subscribe(facebookVideoEmbed => {
        this.embedHtml = facebookVideoEmbed;
        this.embedHtml = this.embedHtml.embed_html;
      });
    }
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

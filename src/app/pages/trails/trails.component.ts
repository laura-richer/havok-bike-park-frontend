import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, Title }           from '@angular/platform-browser';
import { ApiConnections }            from '../../services/api-connections.service';
import { Observable }                from 'rxjs/Rx';

@Component({
  selector: 'app-trails',
  templateUrl: './trails.component.html'
})
export class TrailsComponent implements OnInit {

  public trails;

  // Equal height vars
  public maxHeightName;
  public findClass;
  public currheightName;
  public windowWidth: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Trails | Havok Bike Park');

    // Get initial window size
    this.windowWidth = window.innerWidth;

    // Get page info from API
    this.apiConnections.getPage(11)
      .subscribe(trails => {
        this.trails = trails;
        setTimeout(() => this.equalHeight(), 100);
      });
  }

  // Trigger equal height stuff after view has built
  ngAfterViewInit() {

    // Get initial window size
    this.windowWidth = window.innerWidth;

    // And after resize
    Observable.fromEvent(window, 'resize')
      .debounceTime(100)
      .subscribe((e: Event) => {
        this.getWindowWidth(e);
    });
  }

  // Store window width and reinit equalize
  getWindowWidth(e) {
    this.windowWidth = e.target.innerWidth;
    this.equalHeight();
  }

  // Make menu description same height
  equalHeight() {
    this.maxHeightName = 0;
    this.findClass = document.getElementsByClassName('equalize');

    // Loop over matching divs
    for (var i = 0; i < this.findClass.length; i++) {
      this.findClass[i].style.height = 'auto';
      this.currheightName = this.findClass[i].offsetHeight;

      if (this.currheightName > this.maxHeightName) {
        this.maxHeightName = this.currheightName;
      }
    }

    for (var i = 0; i < this.findClass.length; i++) {

      if (this.windowWidth > 767) {
        this.findClass[i].style.height = this.maxHeightName + 'px';
      } else {
        this.findClass[i].style.height = 'auto';
      }
    }
  }
}

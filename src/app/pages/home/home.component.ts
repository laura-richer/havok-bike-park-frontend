import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT, Title }                         from "@angular/platform-browser";
import { WINDOW }                                  from "../../services/window.service";
import { ApiConnections }                          from '../../services/api-connections.service';
import { ArraySort }                               from '../../services/array-sort.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;
  public eventsAll;
  public eventsUnordered;
  public eventsOrdered;
  public hasAppeared: string;
  public aboutTrigger: boolean = false;
  public eventsTrigger: boolean = false;

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window) {

    // Set empty arrays
    this.eventsAll = 1;
    this.eventsUnordered = [];
    this.eventsOrdered = [];
  }

  ngOnInit(): void {

    // Set meta title
    this.titleService.setTitle('Home | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(5)
      .subscribe(about => {
        this.about = about;
      });

    // Get events from facebook
    this.apiConnections.getFacebookList('events?access_token=')
      .subscribe(events => {
        this.eventsAll = events['data'];

        // Remove past events
        this.arraySort.removePastDates(this.eventsAll);

        // Get single event info and create new array
        this.getEventInfo(this.eventsAll);

        // Sort array into correct order
        setTimeout(() => this.eventsUnordered.sort(this.sortNumber), 500);
        setTimeout(() => this.eventsOrdered = this.eventsUnordered.reverse(), 510);
      });
  }

  // Get single event info an build new array
  getEventInfo(object) {
    for (var i = 0; i < object.length; i++) {

      this.apiConnections.getFacebookSingleEvent(this.eventsAll[i].id)
        .subscribe(singleEvent => {

          this.eventsUnordered.push({
            'id': singleEvent['id'],
            'start_time': singleEvent['start_time'],
            'description': singleEvent['description'],
            'name': singleEvent['name'],
            'cover_image': singleEvent['cover']['source']
          });
        });
    }
  }

  // Sort into ID order
  // Need to move to service
  sortNumber(a, b) {
    return a.id - b.id;
  }

  // Parallax Scrolling
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.parallaxScroll('parallax-image-1', 2);
    this.parallaxScroll('parallax-image-2', 6);
  }

  parallaxScroll(object, intensity) {
    var element = document.getElementsByClassName(object);
    var scrollTop = window.scrollY;
    var imgPos = scrollTop / intensity + 'px';
    document.getElementById(object).style.transform = 'translateY(' + imgPos + ')';
  }
}

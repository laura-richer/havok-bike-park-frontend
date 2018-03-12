import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';
import { ArraySort }         from '../../services/array-sort.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;
  public aboutImage1;
  public aboutImage2;
  public events;
  public singleEvent: any;
  public eventsAll;
  public eventsSorted;

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {

    this.eventsAll = [];
    this.eventsSorted = [];
  }

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(about => {
        this.about = about["content"]["rendered"];
        this.aboutImage1 = about["acf"]["about_image_1"];
        this.aboutImage2 = about["acf"]["about_image_2"];
      });

    // Get events from facebook
    this.apiConnections.getFacebookList("events?access_token=")
      .subscribe(events => {
        this.events = events;
        this.arraySort.sortByDate(this.events);
        this.events = this.events.data;

        // Get single event info
        this.getEventInfo(this.events);

        // Re sort arrays after single event info is built
        setTimeout(() => this.eventsAll.sort(this.sortNumber), 300);
        setTimeout(() => this.eventsSorted = this.eventsAll.reverse(), 310);
      });
  }

  getEventInfo(object) {
    this.events = object;

    for (var i = 0; i < this.events.length; i++) {
      this.apiConnections.getFacebookSingleEvent(this.events[i].id)
        .subscribe(singleEvent => {
          this.singleEvent = singleEvent;
          this.eventsAll.push({
            'id': this.singleEvent.id,
            'start_time': this.singleEvent.start_time,
            'description': this.singleEvent.description,
            'name': this.singleEvent.name,
            'cover_image': singleEvent["cover"]["source"]
          });
        });
    }
  }

  sortNumber(a, b) {
    return a.id - b.id;
  }

}

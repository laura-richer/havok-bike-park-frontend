import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';
import { ArraySort }         from '../../services/array-sort.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  // API vars
  public eventsAll;
  public eventsUnordered;
  public eventsOrdered;
  public pageInfo;
  public pageTitle: string;


  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {

    // Set empty arrays
    this.eventsAll = 1;
    this.eventsUnordered = [];
    this.eventsOrdered = [];
  }

  ngOnInit() {

    // Get page info
    this.apiConnections.getPage(7)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
        this.pageTitle = this.pageInfo.title.rendered
      });

    // Get events from facebook
    this.apiConnections.getFacebookList("events?access_token=")
      .subscribe(events => {
        this.eventsAll = events["data"];

        console.log(this.eventsAll);

        // Remove past events
        this.arraySort.removePastDates(this.eventsAll);

        console.log(this.eventsAll);

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
            'id': singleEvent["id"],
            'start_time': singleEvent["start_time"],
            'description': singleEvent["description"],
            'name': singleEvent["name"],
            'cover_image': singleEvent["cover"]["source"]
          });
        });
    }
  }

  // Sort into ID order
  // Need to move to service
  sortNumber(a, b) {
    return a.id - b.id;
  }
}
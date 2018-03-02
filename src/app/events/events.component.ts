import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';
import { ArraySort }    from '../services/array-sort.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  // API vars
  public events: any;
  public pageInfo;
  private pageTitle: string;

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {}

  ngOnInit() {
    this.apiConnections.getPage(7)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
        this.pageTitle = this.pageInfo.title.rendered
      });

    this.apiConnections.getCustomPost("events")
      .subscribe(events => {
        this.events = events;
        this.arraySort.sortByDate(this.events);
      });
  }
}

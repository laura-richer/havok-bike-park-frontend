import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  // API vars
  public events: any;
  public pageInfo;
  private pageTitle: string;

  // Date vars
  private currentDate;
  private dateFormatted;

  constructor(private apiConnections: ApiConnections) {
    this.currentDate = new Date();
    this.dateFormatted = this.currentDate.getFullYear() + '' + (this.currentDate.getMonth() + 1) + '' + this.currentDate.getDate();
  }

  ngOnInit() {
    this.apiConnections.getPage(7)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
        this.pageTitle = this.pageInfo.title.rendered
      });

    this.apiConnections.getCustomPost("events")
      .subscribe(events => {
        this.events = events;

        // Remove past events
        for (var i = this.events.length - 1; i >= 0; --i) {
            if (this.events[i].acf.event_date < this.dateFormatted) {
                this.events.splice(i,1);
            }
        }

        // Eventually move this into a service
        // order events by event date
        this.events = this.events.slice(0);
        this.events.sort(function(a,b) {
            return a.acf.event_date - b.acf.event_date;
        });
        //-----------------------------------

      });
  }
}

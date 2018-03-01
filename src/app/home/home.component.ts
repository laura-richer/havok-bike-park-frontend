import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;
  public events;

  // Date vars
  private currentDate;
  private dateFormatted;
  private eventDate;

  constructor(private apiConnections: ApiConnections) {
    this.currentDate = new Date();
    this.dateFormatted = this.currentDate.getFullYear() + '' + (this.currentDate.getMonth() + 1) + '' + this.currentDate.getDate();
  }

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(data => {
        this.about = data["content"]["rendered"];
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

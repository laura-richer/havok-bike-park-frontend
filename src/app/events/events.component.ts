import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  public events;
  public pageInfo;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getPage(7)
      .subscribe(data => {
        this.pageInfo = data;
        console.log(this.pageInfo);
      });

    this.apiConnections.getCustomPost("events")
      .subscribe(data => {
        this.events = data;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';
import { ArraySort }         from '../services/array-sort.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;
  public events;

  // Date formatting
  public currentDate;
  public dateFormatted;
  public yearFormatted;
  public monthFormatted;
  public dayFormatted;
  public mm;
  public dd

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {

    this.currentDate = new Date();
    this.mm = this.currentDate.getMonth() + 1;
    this.dd = this.currentDate.getDate();

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }

    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    this.dateFormatted = this.currentDate.getFullYear() + '' + this.mm + '' + this.dd;
  }

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(about => {
        this.about = about["content"]["rendered"];
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

        // Sort remaining by event date
        this.events = this.events.slice(0);
        this.events.sort(function(a,b) {
            return a.acf.event_date - b.acf.event_date;
        });

        // Format dates
        for (var i = this.events.length - 1; i >= 0; --i) {
          this.dateFormatted = this.events[i].acf.event_date
          this.yearFormatted = this.dateFormatted.substring(0, 4);
          this.monthFormatted = this.dateFormatted.substring(4, 6);
          this.dayFormatted = this.dateFormatted.substring(6, 9);
          this.dateFormatted = this.dayFormatted + '/' + this.monthFormatted + '/' + this.yearFormatted;
        }
      });
  }

}

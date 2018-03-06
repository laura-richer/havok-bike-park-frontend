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
  public dateFormatted;
  public yearFormatted;
  public monthFormatted;
  public dayFormatted;

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {}

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(about => {
        this.about = about["content"]["rendered"];
      });

    this.apiConnections.getCustomPost("events")
      .subscribe(events => {
        this.events = events;
        this.arraySort.sortByDate(this.events);

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

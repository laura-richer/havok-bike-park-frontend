import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';
import { ArraySort }         from '../services/array-sort.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;
  public aboutImage1;
  public aboutImage2;
  public events;

  constructor(
    private apiConnections: ApiConnections,
    private arraySort: ArraySort) {}

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(about => {
        this.about = about["content"]["rendered"];
        this.aboutImage1 = about["acf"]["about_image_1"];
        this.aboutImage2 = about["acf"]["about_image_2"];
      });

    this.apiConnections.getCustomPost("events")
      .subscribe(events => {
        this.events = events;
        this.arraySort.sortByDate(this.events);
      });
  }

}

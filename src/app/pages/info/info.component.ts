import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  public lat: number = 53.7302025;
  public lng: number = -2.1534588;

  public pageInfo;
  public parkData;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Park Info | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(9)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
      });

      // Get generic site info from API
     this.apiConnections.getACFOptions()
      .subscribe(acfData => {
        this.parkData = acfData['acf'];
      });
  }

}

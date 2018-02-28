import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  public lat: number = 53.7302025;
  public lng: number = -2.1534588;

  private pageInfo;
  private openingTimes;
  private prices;
  private address;
  private emailAddress;
  public latitude: number;
  public longitude: number;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getPage(9)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
        console.log(this.pageInfo);
      });

     this.apiConnections.getACFOptions()
      .subscribe(acfData => {
        this.openingTimes = acfData["acf"]["opening_times"];
        this.prices = acfData["acf"]["membership_prices"];
        this.address = acfData["acf"]["location_address"];
        this.emailAddress = acfData["acf"]["email_address"];
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  // Vars
  public lat: number = 53.7302025;
  public lng: number = -2.1534588;

  // Content vars
  public address;
  public emailAddress;
  public openingTimes;
  public pageTitle: string;
  public prices;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Park Info | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(9)
      .subscribe(pageInfo => {
        this.pageTitle = pageInfo['title']['rendered'];
      });

      // Get generic site info from API
     this.apiConnections.getACFOptions()
      .subscribe(acfData => {
        this.address = acfData["acf"]["location_address"];
        this.emailAddress = acfData["acf"]["email_address"];
        this.openingTimes = acfData["acf"]["opening_times"];
        this.prices = acfData["acf"]["membership_prices"];
      });
  }

}

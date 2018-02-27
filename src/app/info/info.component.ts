import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  private pageInfo;
  private openingTimes;
  private prices;
  private address;
  private emailAddress;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getPage(9)
      .subscribe(data => {
        this.pageInfo = data;
        console.log(this.pageInfo);
      });

     this.apiConnections.getACFOptions()
      .subscribe(data => {
        this.openingTimes = data["acf"]["opening_times"];
        this.prices = data["acf"]["membership_prices"];
        this.address = data["acf"]["location_address"];
        this.emailAddress = data["acf"]["email_address"];
        console.log(data);
      });
  }

}

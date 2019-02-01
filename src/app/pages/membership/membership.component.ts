import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html'
})
export class MembershipComponent implements OnInit {

  public membership;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Membership Benefits | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(30)
      .subscribe(membership => {
        this.membership = membership;
      });
  }

}

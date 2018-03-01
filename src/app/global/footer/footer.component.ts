import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  private stripURL;
  private today;
  private siteName;
  private footerNavItems;
  private openingTimes;
  private facebookLink;
  private instagramLink;

  constructor(private apiConnections: ApiConnections) {
    this.today = new Date().getFullYear();

  }

  ngOnInit() {
    this.apiConnections.getBasic()
      .subscribe(data => {
        this.siteName = data["name"];
      });

    this.apiConnections.getMenu("social")
      .subscribe(data => {
        this.footerNavItems = data["items"];
      });

     this.apiConnections.getACFOptions()
      .subscribe(data => {
        this.openingTimes = data["acf"]["opening_times"];
        this.facebookLink = data["acf"]["facebook_page"];
        this.instagramLink = data["acf"]["instagram_page"];
      });
  }

}

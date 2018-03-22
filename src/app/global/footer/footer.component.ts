import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public stripURL;
  public today;
  public siteName;
  public footerNavItems;
  public openingTimes;
  public facebookLink;
  public instagramLink;

  constructor(private apiConnections: ApiConnections) {

    // Get current year
    this.today = new Date().getFullYear();

  }

  ngOnInit() {

    // Get footer info from API
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

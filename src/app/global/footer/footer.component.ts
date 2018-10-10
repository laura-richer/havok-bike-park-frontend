import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public facebookLink;
  public footerNavItems;
  public instagramLink;
  public openingTimes;
  public siteName;
  public stripURL;
  public today;

  constructor(private apiConnections: ApiConnections) {

    // Get current year
    this.today = new Date().getFullYear();

  }

  ngOnInit() {

    // Get footer info from API
    this.apiConnections.getBasic()
      .subscribe(data => {
        this.siteName = data['name'];
      });

    this.apiConnections.getMenu("social")
      .subscribe(data => {
        this.footerNavItems = data['items'];
      });

     this.apiConnections.getACFOptions()
      .subscribe(data => {
        this.facebookLink = data['acf']['facebook_page'];
        this.instagramLink = data['acf']['instagram_page'];
        this.openingTimes = data['acf']['opening_times'];
      });
  }

}

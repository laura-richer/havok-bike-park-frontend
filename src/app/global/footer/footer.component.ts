import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public today;
  public siteName;
  public footerNavItems;
  public footerData;

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

    this.apiConnections.getMenu('social')
      .subscribe(data => {
        this.footerNavItems = data['items'];
      });

     this.apiConnections.getACFOptions()
      .subscribe(data => {
        this.footerData = data['acf'];
      });
  }

}

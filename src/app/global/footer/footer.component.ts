import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  private today;
  private siteName;
  private footerNavItems;

  constructor(private apiConnections: ApiConnections) {
    this.today = Date.now();
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
  }

}

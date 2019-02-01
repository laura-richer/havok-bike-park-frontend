import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html'
})
export class InsuranceComponent implements OnInit {

  public insuranceInfo;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Insurance | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(32)
      .subscribe(insurance => {
        this.insuranceInfo = insurance;
      });
  }

}

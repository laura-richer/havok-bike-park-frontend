import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html'
})
export class InsuranceComponent implements OnInit {

  private insuranceInfo;
  private pageTitle;
  private mainCopy;
  private personalMainInfo;
  private personalTicklist;
  private equipmentMainInfo;
  private equipmentTicklist;
  private personalCTA;
  private equipmentCTA;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getPage(32)
      .subscribe(insurance => {
        this.insuranceInfo = insurance;
        this.pageTitle = this.insuranceInfo["title"]["rendered"];
        this.mainCopy = this.insuranceInfo["content"]["rendered"];
        this.personalMainInfo = this.insuranceInfo["acf"]["personal_main_info"];
        this.personalTicklist = this.insuranceInfo["acf"]["personal_ticklist"];
        this.personalCTA = this.insuranceInfo["acf"]["personal_cta_image"];

        this.equipmentMainInfo = this.insuranceInfo["acf"]["equipment_main_info"];
        this.equipmentTicklist = this.insuranceInfo["acf"]["equipment_ticklist"];
        this.equipmentCTA = this.insuranceInfo["acf"]["equipment_cta_image"];
      });
  }

}

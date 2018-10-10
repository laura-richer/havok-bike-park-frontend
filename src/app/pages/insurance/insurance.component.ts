import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html'
})
export class InsuranceComponent implements OnInit {

  public equipmentCTA;
  public equipmentMainInfo;
  public equipmentTicklist;
  public mainCopy;
  public pageTitle;
  public personalCTA;
  public personalMainInfo;
  public personalTicklist;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Insurance | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(32)
      .subscribe(insurance => {
        this.equipmentCTA = insurance['acf']['equipment_cta_image'];
        this.equipmentMainInfo = insurance['acf']['equipment_main_info'];
        this.equipmentTicklist = insurance['acf']['equipment_ticklist'];
        this.mainCopy = insurance['content']['rendered'];
        this.pageTitle = insurance['title']['rendered'];
        this.personalCTA = insurance['acf']['personal_cta_image'];
        this.personalMainInfo = insurance['acf']['personal_main_info'];
        this.personalTicklist = insurance['acf']['personal_ticklist'];
      });
  }
}

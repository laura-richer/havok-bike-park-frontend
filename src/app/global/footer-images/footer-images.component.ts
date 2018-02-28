import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'footer-images',
  templateUrl: './footer-images.component.html'
})
export class FooterImagesComponent implements OnInit {

  private fi1;
  private fi2;
  private fi3;
  private fi4;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
     this.apiConnections.getACFOptions()
      .subscribe(acfOptions => {
        this.fi1 = acfOptions["acf"]["image_1"];
        this.fi2 = acfOptions["acf"]["image_2"];
        this.fi3 = acfOptions["acf"]["image_3"];
        this.fi4 = acfOptions["acf"]["image_4"];
      });
  }

}

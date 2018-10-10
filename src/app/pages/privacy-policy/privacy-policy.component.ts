import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyComponent implements OnInit {

  constructor(private titleService: Title) {}

  ngOnInit() {
    // Set meta title
    this.titleService.setTitle('Privacy Policy | Havok Bike Park');
  }

}

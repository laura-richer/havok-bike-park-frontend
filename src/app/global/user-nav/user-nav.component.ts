import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'user-nav',
  templateUrl: './user-nav.component.html'
})
export class UserNavComponent implements OnInit {

  public userNavItems;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getMenu("top")
      .subscribe(data => {
        this.userNavItems = data["items"];
      });
  }
}

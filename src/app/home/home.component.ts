import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public about;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit(): void {
    this.apiConnections.getPage(5)
      .subscribe(data => {
        this.about = data["content"]["rendered"];
      });
  }

}

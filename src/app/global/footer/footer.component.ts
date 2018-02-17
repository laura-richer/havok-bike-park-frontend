import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  private today;

  constructor() {
    this.today = Date.now();
  }

  ngOnInit() {
  }

}

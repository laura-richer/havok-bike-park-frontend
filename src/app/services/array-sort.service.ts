import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public events: any;
  public currentDate;
  public dateFormatted;
  public mm;
  public dd;

  constructor() {
    this.currentDate = new Date();
    this.mm = this.currentDate.getMonth() + 1;
    this.dd = this.currentDate.getDate();

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }

    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    this.dateFormatted = this.currentDate.getFullYear() + '' + this.mm + '' + this.dd;
  }

  // Sort objects by date
  sortByDate(object) {

    // Remove past events
    for (var i = object.length - 1; i >= 0; --i) {
      if (object[i].acf.event_date < this.dateFormatted) {
        object.splice(i,1);
       }
    }

    // Sort remaining by event date
    this.events = object.slice(0);
    this.events.sort(function(a,b) {
        return a.acf.event_date - b.acf.event_date;
    });
  }
}
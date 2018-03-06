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

  sortByDate(object) {
    this.events = object;

    // Remove past events
    for (var i = object.length - 1; i >= 0; --i) {
      if (object[i].acf.event_date < this.dateFormatted) {
        this.events.splice(i,1);
      }
    }

    return this.events.sort(this.sortNumber);
  }

  // Sort array by date
  sortNumber(a, b) {
    return a.acf.event_date - b.acf.event_date;
  }
}
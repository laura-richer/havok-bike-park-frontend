import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public byDate: any;
  public currentDate;
  public dateFormatted;

  constructor() {
    this.currentDate = new Date();
    this.dateFormatted = this.currentDate.getFullYear() + '' + (this.currentDate.getMonth() + 1) + '' + this.currentDate.getDate();
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
    this.byDate = object.slice(0);
    this.byDate.sort(function(a,b) {
        return a.acf.event_date - b.acf.event_date;
    });
  }
}
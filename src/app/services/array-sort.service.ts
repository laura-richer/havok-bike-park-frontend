import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public eventsAll: any;
  public eventsUnordered: any;
  public currentDate;

  constructor() {
    // Setting date and formatting to work with midnight start time on FB events
    this.currentDate = new Date();
    this.currentDate = Date.parse(this.currentDate);
    this.currentDate = this.currentDate.toString();
  }

  removePastDates(object) {
    this.eventsAll = object;
    var eventDate;
    var eventDateFormatted;

    // Remove past events
    // Safari returning as NaN
    for (var i = object.length - 1; i >= 0; --i) {
      eventDate = object[i].start_time.replace("-", "/")
      console.log(eventDate);

      eventDateFormatted = Date.parse(eventDate);
      console.log(eventDateFormatted);

      if ( Date.parse(object[i].start_time) < this.currentDate) {
        this.eventsAll.splice(i,1);
      }
    }
  }
}
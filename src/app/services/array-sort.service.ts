import { Injectable } from '@angular/core';

@Injectable()
export class ArraySort {

  public byDate: object[];

  constructor() {}

  // Sort objects by date
  sortByDate(object) {
    console.log('original')
    console.log(object);

    this.byDate = object.slice(0);
    this.byDate.sort(function(a,b) {
        return a.acf.event_date - b.acf.event_date;
    });
    //console.log('sort by date:');
    //console.log(this.byDate);
  }
}
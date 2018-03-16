import { Injectable } from '@angular/core';

@Injectable()
export class ModalOrientation {

  private createArray;
  private mediaWidth;
  private mediaHeight;
  public position;

  constructor() {}

  getDimensions(edge, src) {
    // create array splitting by spaces
    this.createArray = src.split(" ");

    // get dimensions
    this.mediaWidth = this.createArray[2].match(/\d+/g);
    this.mediaHeight = this.createArray[3].match(/\d+/g);

    (this.mediaWidth[0]);
    (this.mediaHeight[0]);

    this.getOrientation(this.mediaWidth[0], this.mediaHeight[0]);
    return this.position;
  }

  getOrientation(width, height) {
    // Work out modal orintation
    if (height > width) {
      this.position = 'portrait';
    } else if (width > height) {
      this.position = 'landscape';
    }

    // does the iframe/video function still work if this is here?
    // Can use for images if it does
    //return this.position
  }
}
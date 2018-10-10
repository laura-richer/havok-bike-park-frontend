import { Injectable } from '@angular/core';

@Injectable()
export class ModalOrientation {

  private createArray;
  private mediaHeight;
  private mediaWidth;
  public position;

  constructor() {}

  // Get dimensions iframe
  getDimensions(edge, src) {
    // create array splitting by spaces
    this.createArray = src.split(" ");

    // get dimensions
    this.mediaWidth = this.createArray[2].match(/\d+/g);
    this.mediaHeight = this.createArray[3].match(/\d+/g);

    this.getOrientation(this.mediaWidth[0], this.mediaHeight[0]);
    return this.position;
  }

  getImageOrientation (width, height) {
    this.getOrientation(width, height);
    return this.position;
  }

  getOrientation(width, height) {
    // Work out modal orintation
    if (height >= width) {
      this.position = 'portrait';
    } else if (width > height) {
      this.position = 'landscape';
    }
  }
}
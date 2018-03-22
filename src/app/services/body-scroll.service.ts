import { Injectable } from '@angular/core';

@Injectable()
export class BodyScrollService {

  private pageBody: any = document.getElementsByTagName('body')[0];

  // remove scroll when modal open
  removeScroll() {
    if (/Mobi/.test(navigator.userAgent)) {

      // iphone 5 check
      if (screen.availWidth <= 375 && screen.availHeight <= 667) {
        this.pageBody.classList.add('no-scroll');
        setTimeout(() => this.pageBody.classList.add('fixed'), 400);
      } else {
        this.pageBody.classList.add('no-scroll', 'fixed');
      }
    } else {
      this.pageBody.classList.add('no-scroll');
    }
  }

  // add scroll when modal closes
  addScroll() {
    this.pageBody.classList.remove('no-scroll', 'fixed');
  }
}
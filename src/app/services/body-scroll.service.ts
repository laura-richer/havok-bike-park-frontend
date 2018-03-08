import { Injectable } from '@angular/core';

@Injectable()
export class BodyScrollService {

  private pageBody: any = document.getElementsByTagName('body')[0];

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

  addScroll() {
    this.pageBody.classList.remove('no-scroll', 'fixed');
  }
}
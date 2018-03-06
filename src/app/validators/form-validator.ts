import { FormControl, FormGroup } from '@angular/forms';

export class FormValidator {

  // Email Address Validation
  static emailValidator( control: FormControl ) {

    var regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(control.value);

    if ( regEx ){
      return null;
    }

    return {"invalidEmail": true};
  }
}

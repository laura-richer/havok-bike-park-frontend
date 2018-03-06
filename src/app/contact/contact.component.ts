import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConnections }    from '../services/api-connections.service';
import { FormValidator }     from '../validators/form-validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  public pageInfo: any;
  public pageTitle: string;
  public pageContent: string;
  private contactForm: FormGroup;

  constructor(
    private apiConnections: ApiConnections,
    private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', FormValidator.emailValidator],
      phoneNumber: [''],
      message: [''],
    });

  }

  ngOnInit() {
    this.apiConnections.getPage(15)
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo;
        this.pageTitle = this.pageInfo.title.rendered
      });
  }

  contactFormSubmit() {
    console.log(this.contactForm);
  }

}

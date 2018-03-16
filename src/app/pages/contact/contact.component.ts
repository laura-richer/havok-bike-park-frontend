import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConnections }    from '../../services/api-connections.service';
import { FormValidator }     from '../../validators/form-validator';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  public pageInfo: any;
  public pageTitle: string;
  public pageContent: string;
  public formInfo: any;
  private contactForm: FormGroup;

  constructor(
    private apiConnections: ApiConnections,
    private formBuilder: FormBuilder,
    private http: HttpClient) {

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
        this.pageTitle = this.pageInfo.title.rendered;
        this.pageContent = this.pageInfo.content.rendered;
      });
  }

  contactFormSubmit() {
    this.formInfo = "name=" + this.contactForm.value.fullName + "&email=" + this.contactForm.value.emailAddress + "&phone=" + this.contactForm.value.phoneNumber + "&message=" + this.contactForm.value.message;
    console.log(this.formInfo);
    this.http.post("http://api.havokbikepark.com/wp-json/ccf/v1/forms/93", this.formInfo).subscribe((data) => {});
  }

}

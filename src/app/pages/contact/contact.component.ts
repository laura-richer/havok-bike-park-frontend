import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title }                              from "@angular/platform-browser";
import { ApiConnections }                     from '../../services/api-connections.service';
import { FormValidator }                      from '../../validators/form-validator';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  // Content vars
  private contactForm: FormGroup;
  public formInfo: any;
  public pageContent: string;
  public pageTitle: string;

  constructor(
    private apiConnections: ApiConnections,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private titleService: Title) {


    // Build contact form
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', FormValidator.emailValidator],
      phoneNumber: [''],
      message: [''],
    });

  }

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Contact Us | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(15)
      .subscribe(pageInfo => {
        this.pageContent = pageInfo['content']['rendered'];
        this.pageTitle = pageInfo['title']['rendered'];
      });
  }

  // WIP - contact form POST to API
  contactFormSubmit() {
    this.formInfo = "name=" + this.contactForm.value.fullName + "&email=" + this.contactForm.value.emailAddress + "&phone=" + this.contactForm.value.phoneNumber + "&message=" + this.contactForm.value.message;
    this.http.post("http://api.havokbikepark.com/wp-json/ccf/v1/forms/93", this.formInfo).subscribe((data) => {});
  }

}

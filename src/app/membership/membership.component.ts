import { Component, OnInit } from '@angular/core';
import { ApiConnections }    from '../services/api-connections.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html'
})
export class MembershipComponent implements OnInit {

  public membership;
  public pageTitle;
  public mainCopy;
  public subParagraph;
  public benefits;
  public benefitsIntro;

  constructor(private apiConnections: ApiConnections) {}

  ngOnInit() {
    this.apiConnections.getPage(30)
      .subscribe(membership => {
        this.membership = membership;
        this.pageTitle = membership["title"]["rendered"];
        this.mainCopy = membership["content"]["rendered"];
        this.subParagraph = membership["acf"]["sub_paragraph"];
        this.benefits = membership["acf"]["benefits"];
        this.benefitsIntro = membership["acf"]["benefits_intro"];

        console.log(this.membership.acf);
      });
  }

}

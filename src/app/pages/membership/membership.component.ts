import { Component, OnInit } from '@angular/core';
import { Title }             from "@angular/platform-browser";
import { ApiConnections }    from '../../services/api-connections.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html'
})
export class MembershipComponent implements OnInit {

  public benefits;
  public benefitsIntro;
  public mainCopy;
  public pageTitle;
  public subParagraph;

  constructor(
    private apiConnections: ApiConnections,
    private titleService: Title) {}

  ngOnInit() {

    // Set meta title
    this.titleService.setTitle('Membership Benefits | Havok Bike Park');

    // Get page info from API
    this.apiConnections.getPage(30)
      .subscribe(membership => {
        this.benefits = membership['acf']['benefits'];
        this.benefitsIntro = membership['acf']['benefits_intro'];
        this.mainCopy = membership['content']['rendered'];
        this.pageTitle = membership['title']['rendered'];
        this.subParagraph = membership['acf']['sub_paragraph'];
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ApiConnections }    from '../../services/api-connections.service';
import { Apollo }            from 'apollo-angular';
import gql                   from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { InMemoryCache }     from 'apollo-cache-inmemory';
import { Observable }        from 'rxjs/Observable';

const PostsGetQuery = gql`
  query PostsGetQuery{
    posts_list {
        id
        title
        body
        user {
          id
          firstName
          lastName
          bio
        }
      }
  }
`;

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  public today;
  public siteName;
  public footerNavItems;
  public footerData;
  public data;

  constructor(private apiConnections: ApiConnections, private apollo: Apollo) {

    // Get current year
    this.today = new Date().getFullYear();
  }

  ngOnInit() {

    this.apollo.watchQuery<any>({
      query: PostsGetQuery
    })
      .valueChanges
      .subscribe(({data}) => {
        this.data = data.posts_list;
      });

    // Get footer info from API
    this.apiConnections.getBasic()
      .subscribe(data => {
        this.siteName = data['name'];
      });

    this.apiConnections.getMenu('social')
      .subscribe(data => {
        this.footerNavItems = data['items'];
      });

     this.apiConnections.getACFOptions()
      .subscribe(data => {
        this.footerData = data['acf'];
      });
  }

}

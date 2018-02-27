import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiConnections {

  private wpAPI;
  private menus;
  private pages;
  private content;

  constructor(private http: HttpClient) {
    this.wpAPI = 'http://api.havokbikepark.com/wp-json/';
    this.menus = 'menus/v1/menus/';
    this.pages = 'pages/';
    this.content ='wp/v2/'
  }

  getBasic() {
    return this.http.get(this.wpAPI);
  }

  // Get menus
  getMenu(slug) {
    return this.http.get(this.wpAPI + this.menus + slug);
  }

  // Get page data
  getPage(id){
    return this.http.get(this.wpAPI + this.content + this.pages + id);
  }

  // Get post list
  getPostList(id){
    return this.http.get(this.wpAPI + this.content + 'posts/' + id);
  }

  // Get post list
  getCustomPost(slug){
    return this.http.get(this.wpAPI + this.content + slug);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiConnections {

  private wpAPI;
  private menus;
  private pages;
  private content;
  private acfOptions;

  constructor(private http: HttpClient) {
    this.wpAPI = 'http://api.havokbikepark.com/wp-json/';
    this.menus = 'menus/v1/menus/';
    this.content ='wp/v2/';
    this.pages = 'pages/';
    this.acfOptions = 'acf/v2/options/'
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

  // Get ACF options
  getACFOptions(){
    return this.http.get(this.wpAPI + this.acfOptions);
  }

  // Get post list
  getCustomPost(slug){
    return this.http.get(this.wpAPI + this.content + slug);
  }
}
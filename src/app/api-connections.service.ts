import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiConnections {

  private wpAPI;
  private menus;
  private content;

  constructor(private http: HttpClient) {
    this.wpAPI = 'http://api.havokbikepark.com/wp-json/';
    this.menus = 'menus/v1/menus/';
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
    return this.http.get('http://api.havokbikepark.com/wp-json/wp/v2/pages/' + id);
  }

  // Get post list
  getPostList(id){
    return this.http.get('http://api.havokbikepark.com/wp-json/wp/v2/pages/' + id);
  }

}

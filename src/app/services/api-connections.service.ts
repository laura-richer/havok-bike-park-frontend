import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiConnections {

  private wpAPI;
  private menus;
  private pages;
  private content;
  private acfOptions;

  private fbAPI;
  private userId;
  private apiKey;

  constructor(private http: HttpClient) {

    // Wordpress API paths
    this.wpAPI = 'http://api.havokbikepark.com/wp-json/';
    this.menus = 'menus/v1/menus/';
    this.content ='wp/v2/';
    this.pages = 'pages/';
    this.acfOptions = 'acf/v2/options/'

    // Facebook API paths
    this.fbAPI = 'https://graph.facebook.com/'
    this.userId = '294138224007098/';
    this.apiKey = 'EAACEdEose0cBAHoDGPkimrQ6JBYdpYoaCCUZBbnbYdGFEsW1aVzrtZBBscPeLZCAmmABPWHTg26soJ1FLEJHdQphUfPyXPcoGaexQm6KTB6BxCZC9ZBXsTCPmnlhPPXaZA02DETFTfJnBjoNDMQdof9ooK4JnLnoWIOA9cDHf3viUnEFbAACuApSBUe8hFCKcZD';
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

  // Get Facebook info
  getFacebook(slug) {
    return this.http.get(this.fbAPI + this.userId + slug + '?access_token=' + this.apiKey);
  }
}
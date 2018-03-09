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
    this.apiKey = 'EAAGZBsrRFgEABAM4QFDXIMI6OqZAQJ2VaRSRyHjz01KFPZCThYOziH955CzaTRvvq36HaU67AsaxURvGBvtaCgB8NxP4hsh6AW2pj10mKvv4um0VNVjyg3WT1ZBDwcmcynAJW3nPtxGvKIQEO6ScGzZBAbYGoW08kCGMJHwabngZDZD';
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

  // Get Facebook List
  getFacebookList(slug) {
    return this.http.get(this.fbAPI + this.userId + slug + this.apiKey);
  }

  // Get Facebook Photo
  getFacebookPhotoObject(id) {
    return this.http.get(this.fbAPI + id + "/picture?access_token=" + this.apiKey);
  }

  // Get Facebook Video Thumbnail
  getFacebookVideoThumbnails(id) {
    return this.http.get(this.fbAPI + id + this.apiKey);
  }

  // Get Facebook Video embed link
  getFacebookVideoEmbed(id) {
    return this.http.get(this.fbAPI + id + '?fields=embed_html&access_token=' + this.apiKey);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiConnections {

  // Wordpress API paths
  private wpAPI: string = 'http://api.havokbikepark.com/wp-json/';
  private menus: string = 'menus/v1/menus/';
  private pages: string = 'pages/';
  private media: string = 'media/'
  private content: string = 'wp/v2/';
  private acfOptions: string = 'acf/v2/options/';

  // Facebook API paths
  private fbAPI: string = 'https://graph.facebook.com/';
  private userId: string = '294138224007098/';
  private apiKey: string = 'EAAGZBsrRFgEABALZCXl9xfuDCJgG1wQvZAsli5iDkUC5JrMx0J7ejc3BwRlWSdldft5Y13TqnBmUHmg1P5hQTc5TIbS9KrEQCO3ggk3OsQeSgcLr6RUdqPnKNGWWTYp4sfUyKJX56AXiHlNVkJJTVzTBsJxt0UZD';

  constructor(private http: HttpClient) {}

  // Get basic page
  getBasic() {
    return this.http.get(this.wpAPI);
  }

  // Get menus
  getMenu(slug) {
    return this.http.get(this.wpAPI + this.menus + slug);
  }

  // Get page data
  getPage(id) {
    return this.http.get(this.wpAPI + this.content + this.pages + id);
  }

  getMedia(id) {
    return this.http.get(this.wpAPI + this.content + this.media + id);
  }

  // Get ACF options
  getACFOptions() {
    return this.http.get(this.wpAPI + this.acfOptions);
  }

  // Get post list
  getCustomPost(slug) {
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
  getFacebookMediaEmbed(id, fields) {
    return this.http.get(this.fbAPI + id + '?fields=' + fields + '&access_token=' + this.apiKey);
  }

  // Get Facebook Video embed link
  getFacebookSingleEvent(id) {
    return this.http.get(this.fbAPI + id + '?fields=cover,name,description,id,start_time&access_token=' + this.apiKey);
  }
}
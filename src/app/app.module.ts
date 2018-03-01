import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule }    from '@agm/core';


// Components
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContactComponent } from './contact/contact.component';
import { EventsComponent }  from './events/events.component';
import { HomeComponent }    from './home/home.component';
import { InfoComponent }    from './info/info.component';
import { MediaComponent }   from './media/media.component';
import { TrailsComponent }  from './trails/trails.component';

// Global componants
import { UserNavComponent }      from './global/user-nav/user-nav.component';
import { FooterComponent }       from './global/footer/footer.component';
import { FooterImagesComponent } from './global/footer-images/footer-images.component';

// Services
import { ApiConnections } from './services/api-connections.service';
///import { ArraySort }      from './services/array-sort.service';

// Pipes
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    EventsComponent,
    MediaComponent,
    ContactComponent,
    UserNavComponent,
    FooterComponent,
    FooterImagesComponent,
    TrailsComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjtTzm9pCIiWoQM0PHHIDFWn1RED7SdOM'
    })
  ],
  providers: [ApiConnections],
  bootstrap: [AppComponent]
})
export class AppModule { }

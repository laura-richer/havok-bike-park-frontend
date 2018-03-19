import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }                 from '@angular/common/http';
import { AgmCoreModule }                    from '@agm/core';


// Core Components
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MasonryModule }    from '../../node_modules/angular2-masonry';

// Services
import { ApiConnections }    from './services/api-connections.service';
import { ArraySort }         from './services/array-sort.service';
import { BodyScrollService } from './services/body-scroll.service';
import { ModalOrientation }  from './services/modal-orientation.service';
import { WINDOW_PROVIDERS }  from './services/window.service';

// Pipes
import { DateFormatPipe } from './pipes/date-format.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { TruncatePipe }   from './pipes/truncate.pipe';

// Custom Componants
import { ContactComponent }    from './pages/contact/contact.component';
import { EventsComponent }     from './pages/events/events.component';
import { HomeComponent }       from './pages/home/home.component';
import { InfoComponent }       from './pages/info/info.component';
import { InsuranceComponent }  from './pages/insurance/insurance.component';
import { MediaComponent }      from './pages/media/media.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { TrailsComponent }     from './pages/trails/trails.component';

import { FooterComponent }       from './global/footer/footer.component';
import { FooterImagesComponent } from './global/footer-images/footer-images.component';
import { UserNavComponent }      from './global/user-nav/user-nav.component';

@NgModule({
  declarations: [
    DateFormatPipe,
    EscapeHtmlPipe,
    TruncatePipe,
    AppComponent,
    ContactComponent,
    EventsComponent,
    FooterComponent,
    FooterImagesComponent,
    HomeComponent,
    InfoComponent,
    InsuranceComponent,
    MediaComponent,
    MembershipComponent,
    TrailsComponent,
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MasonryModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjtTzm9pCIiWoQM0PHHIDFWn1RED7SdOM'
    })
  ],
  providers: [
    ApiConnections,
    ArraySort,
    BodyScrollService,
    ModalOrientation,
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

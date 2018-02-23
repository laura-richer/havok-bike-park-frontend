import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { HttpClientModule }  from '@angular/common/http';


// Componants
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent }  from './events/events.component';
import { HomeComponent }    from './home/home.component';
import { InfoComponent }    from './info/info.component';
import { MediaComponent }   from './media/media.component';
import { UserNavComponent } from './global/user-nav/user-nav.component';
import { FooterComponent }  from './global/footer/footer.component';
import { TrailsComponent }  from './trails/trails.component';

// Directives
import { ApiConnections } from './services/api-connections.service';

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
    TrailsComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiConnections],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomeComponent }        from './home/home.component';
import { EventsComponent }      from './events/events.component';
import { InfoComponent }        from './info/info.component';
import { TrailsComponent }      from './trails/trails.component';
import { MediaComponent }       from './media/media.component';
import { ContactComponent }     from './contact/contact.component';
import { MembershipComponent }  from './membership/membership.component';

const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'events',       component: EventsComponent },
  { path: 'park-info',    component: InfoComponent },
  { path: 'trails',       component: TrailsComponent },
  { path: 'media',        component: MediaComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'membership',   component: MembershipComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

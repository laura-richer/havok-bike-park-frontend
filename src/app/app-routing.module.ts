import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomeComponent }        from './pages/home/home.component';
import { EventsComponent }      from './pages/events/events.component';
import { InfoComponent }        from './pages/info/info.component';
import { TrailsComponent }      from './pages/trails/trails.component';
import { MediaComponent }       from './pages/media/media.component';
import { ContactComponent }     from './pages/contact/contact.component';
import { MembershipComponent }  from './pages/membership/membership.component';
import { InsuranceComponent }   from './pages/insurance/insurance.component';

const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'events',     component: EventsComponent },
  { path: 'park-info',  component: InfoComponent },
  { path: 'trails',     component: TrailsComponent },
  { path: 'media',      component: MediaComponent },
  { path: 'contact',    component: ContactComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'insurance',  component: InsuranceComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

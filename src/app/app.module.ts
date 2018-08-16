import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AboutusComponent} from './aboutus/aboutus.component';
import {ContactusComponent} from './contactus/contactus.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyB012e_gWg70h7Fan3XGckjl1URyrr02Sg',
  authDomain: 'e-suggestion-box-system.firebaseapp.com',
  databaseURL: 'https://e-suggestion-box-system.firebaseio.com',
  projectId: 'e-suggestion-box-system',
  storageBucket: 'e-suggestion-box-system.appspot.com',
  messagingSenderId: '196086218726'
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutusComponent
  },
  {
    path: 'contact-us',
    component: ContactusComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

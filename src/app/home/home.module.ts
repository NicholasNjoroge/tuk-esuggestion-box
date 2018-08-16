import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FormsModule} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {FlashMessagesModule} from 'angular2-flash-messages';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  declarations: [HomeComponent],
  providers: [AngularFirestore]
})
export class HomeModule { }

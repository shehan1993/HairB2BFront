import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-material-calendar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { CalenComponent } from './calen/calen.component';
import { SalonViewComponent } from './salon-view/salon-view.component';
import { ImgCasroComponent } from './img-casro/img-casro.component';


@NgModule({
  declarations: [
    AppComponent,
    CalenComponent,
    SalonViewComponent,
    ImgCasroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

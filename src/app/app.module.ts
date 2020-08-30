import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFormComponent } from './form/myform.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccordionComponent } from './accordion.component';
import { ProfileService } from './services/profile.service';
import { VaccineComponent } from './vaccinedes.component';
import {VaccAccordionComponent } from './vaccAccordion.component'
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    AccordionComponent,
    VaccineComponent,
    VaccAccordionComponent
  ],
  imports: [
    Angular4PaystackModule.forRoot('pk_test_a18f42abea034a496aee041a8db12845315af792'),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}

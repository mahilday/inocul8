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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {LoginComponent} from './admin/login.component'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    AccordionComponent,
    VaccineComponent,
    VaccAccordionComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    Angular4PaystackModule.forRoot('pk_live_2d6743929c8d8594dc4a96ade3774ce6a4de56aa'),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      // {path: 'admin/dashboard', component: DashboardComponent},
      {path: '', component: MyFormComponent}
      // {path:'admin/login', component: LoginComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}

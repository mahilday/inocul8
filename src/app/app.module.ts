import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFormComponent } from "./form/myform.component"; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AccordionComponent} from './accordion.component'
import {ProfileService} from './services/profile.service'


@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    AccordionComponent
   
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

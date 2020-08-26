import { Component, OnInit } from '@angular/core';
import {ProfileService} from "./services/profile.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pharmaceutical';
  constructor(private profileService: ProfileService){

  }
  ngOnInit(){
  }
  submitData(event){
    this.profileService.submitted(event)
  }
}

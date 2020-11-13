import { Component, OnInit } from '@angular/core';
import {ProfileService} from "./services/profile.service"
import { Router, NavigationEnd } from '@angular/router';
declare let gtag:Function;
declare let fbq:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pharmaceutical';
  constructor(private profileService: ProfileService, private router: Router){
    router.events.subscribe((y: NavigationEnd) => {
      if(y instanceof NavigationEnd){
        gtag('config','UA-{ID}',{'page_path' : y.url});
        fbq('track', 'PageView');
      }
    })
  }
  ngOnInit(){
  }
  submitData(event){
    this.profileService.submitted(event)
  }
}

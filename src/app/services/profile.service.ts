import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileData: Array<any> = [];
  submitted(event): any {
    this.profileData.push(event);
  }

  brandtype = [];
  branddesItems =[]
  close = true
  dis = (event: any) => {
    this.brandtype.push(event.vaccinetype);
    this.close = true
  };
  branddes(value){
    this.branddesItems.push(value)
  }
  constructor() {}
}

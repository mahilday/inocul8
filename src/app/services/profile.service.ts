import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileData: Array<any> = [];
  submitted(event): any {
    this.profileData.push(event);
    console.log(event);
    console.log(this.profileData);
  }

  brandtype = [];
  close = true
  dis = (event: any) => {
    this.brandtype.push(event);
  };
  constructor() {}
}

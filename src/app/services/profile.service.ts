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
  brandt = null;
  selectedItem = null;
  brandtype = [];
  branddesItems = [];
  //
  // chosen brands array
  brands = [];
  //
  newprices: Array<number> = [];
  price: Array<number> = [];
  close = true;
  dis = (event: any) => {
    this.brandtype.push(event.vaccinetype);
  };
  //
  // types function pushing chosen brands into brands array
  //
  famprices = this.profileData.filter((prof) => {
    prof.brandschosen.filter((brand) => {
      return brand.price;
    });
  });
  types = (type) => {
    console.log(this.brands);
    this.brands.push(type);
    console.log(this.brands);
    this.price.push(type.price);
    console.log(type);
    console.log(this.brandt);
  };
  // check profile length
  //
  profileAlert = false;
  checkProfLength() {
    if (this.profileData.length === 1) {
      this.profileAlert = true;
    }
    if (this.profileData.length >= 2) {
      this.profileAlert = false;
    }
  }

  //
  // home service for vaccination
  //
  home = true;
  //
  // hub service for vaccination
  //
  hub = false;

  prices = () => {
    this.newprices = this.price;
    console.log(this.newprices);
  };

  branddes(value) {
    this.branddesItems.push(value);
  }
  vaccine(vacc) {
    // this.brands = vacc.description.brands.brandtype
    return vacc.description.brands.brandtype;
  }
  selectedItemsUpdate = [];

  tobrand() {
    document.getElementById('email').scrollIntoView({ behavior: 'smooth' });
  }
  constructor() {}
}

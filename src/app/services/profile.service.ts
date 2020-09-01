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
  brands = []
  newprices: Array<number>=[]
  price: number = null
  close = true
  dis = (event: any) => {
    this.brandtype.push(event.vaccinetype);
  };
  types=(type)=>{
    this.brands.push(type)
    this.price= type.price
    console.log(this.brands)
  }
  
  prices=()=>{
    this.newprices.push(this.price)
    console.log(this.newprices)
  }
    
  branddes(value){
    this.branddesItems.push(value)
  }
  vaccine(vacc){
    // this.brands = vacc.description.brands.brandtype
    return vacc.description.brands.brandtype;
  }
  selectedItemsUpdate = []
  deleteForm(brand, index){
    
    if (this.brands[index]) {
      this.brands.splice(index, 1);    
    } else {
      console.log(null);
    }
   
    console.log(brand)
  }
  constructor() {}
}

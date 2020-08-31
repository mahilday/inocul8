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
    console.log(this.price)
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
  deleteForm(brand, index, items){
    if (this.brandtype[index]) {
      this.brandtype.splice(index, 1);
    } else {
      console.log(null);
    }
    const eachitem = items[index]
    if(brand === eachitem.name ){
      items.splice(index, 1)
    } else{
      console.log(null)
    }
    console.log(eachitem)
  }
  constructor() {}
}

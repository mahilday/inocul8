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
  brandt= null
 selectedItem = null
  brandtype = [];
  branddesItems =[]
  brands = []
  newprices: Array<number>=[]
  price: Array<number> = []
  close = true
  dis = (event: any) => {
    this.brandtype.push(event.vaccinetype);
  };
  types=(type)=>{
    console.log(this.brands)
    this.brands.push(type)
    console.log(this.brands)
     this.price.push(type.price)
    console.log(type)
    console.log(this.brandt)
  }
  
  prices=()=>{
    this.newprices = this.price
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
  
  constructor() {}
}

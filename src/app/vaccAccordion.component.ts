import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
    selector: "app-vaccdion",
    template:`
    <div class="vaccwrapper" *ngFor= "let items of items; let i = index" >
    <div class="col accord" (click)= "doses(brand.name, items)">
    <small class="text-center"
      ><span class="name" >{{
       brand.name + ' ' + '&#x20a6;'+brand.price }}</span>
      <button
        type="button"
        (click) = "deleteForm(brand.name, index)"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button></small
    >
  </div>

  
    <form class="form-group" [ngClass] ="isOpen?'':'d-none'" #brandsval="ngForm"> 
      <h5 class="my-3">
        <b
          ><i>{{ newItem.name }}</i></b
        >
      </h5>
      
      
      <p>{{ newItem.description.firstdes }}</p>
      <p>{{ newItem.description.givenhowquest }}</p>
      <p>{{ newItem.description.givenhowanswer }}</p>
      <p>{{ newItem.description.brands.brandquest }}</p>
      <p>Check out the available brands</p>
      <p>{{ newItem.description.brands.branddes }}</p>
    
      <p>Kindly choose a brand</p>
        <div *ngFor ="let type of brandtypes">
          <input
            type="radio"
            class="mr-3 rad"
            name="vaccinetype"
            value="{{ type.name + ' ' + type.price }}"
          />
          <label>{{type.name + ' ' + type.price}}</label>
          
        </div>
        <button class="btn btn-primary px-4 my-2">Save</button>
        </form>
    </div>
    
    `,
    styles: [`
    .close{
      color: #fff;
      float: right;
      margin-left:10px;
    }
    .accord {
      background: #29abe2;
      width: max-content;
      height: max-content;
      border-radius: 30px;
      color: #fff;
      z-index: 99;
      position: relative;
    }
    .accord {
      padding-right: 20px;
      padding-left: 8px;
    }
    `]
})

export class VaccAccordionComponent implements OnInit{
  @Input() brand;
  @Input() index;
  @Input() items: any;

  constructor(private profileService: ProfileService){

  }
    ngOnInit(){

    }
    deleteForm(brand, index) {
     this.profileService.deleteForm(brand, index)
    }
    dosevals =[];
    dosekeys = [];
    brandnew= [];
    brands =[]
    newItem: any = {}
    brandtypes = []
    isOpen = false
    // newprice= []
    doses(brand,items){
      console.log(items)
      let item = items.description.brands.brandtype
      for(let i = 0; i < item.length; i++){
        if(brand === item[i].name){
          this.newItem = items
          console.log(this.newItem)
          this.brandtypes = this.newItem.description.brands.brandtype
         
          this.isOpen = true
        } else{
          console.log(null)
        }
      }
    }
    dis(event) {
      this.profileService.dis(event);
    }
    // addPrices(price){
    //   const newprice = this.profileService.prices(price)
    // }
    getVaccDes(index){
        this.brands = this.profileService.branddesItems
        console.log(this.profileService.branddes[index])
    }
  dose = function (vacc) {
    vacc.description.dosages.map((dose: any) => {
      this.dosekeys = Object.keys(dose.patientdosages);
      this.dosevals = Object.values(dose.patientdosages);
    });
    this.brandnew = vacc.description.brands.brandtype;
  };
  // show = false
  //   onShow() {
  //     this.show = true;
  //   }
    // onEdit(e, profile, index) {
    //   e.preventDefault();
    //   this.profileService.profileData.splice(index, 1, profile);
    //   console.log(this.profileService.profileData[index]);
    //   this.show = false;
    // }
}
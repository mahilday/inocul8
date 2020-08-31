import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
    selector: "app-vaccdion",
    template:`
    <div class="col accord">
    <small class="text-center"
      ><span class="name" >{{
       brand.name + ' ' + brand.price }}</span>
      <button
        type="button"
        (click) = "deleteForm(brand, index)"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button></small
    >
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
    // newprice= []

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
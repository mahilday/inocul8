import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
    selector: "app-vaccdion",
    template:`
    <div class="col accord">
    <small class="text-center"
      ><span class="name" >{{
       brand
      }}</span>
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
      <h5 class="my-3">
        <b
          ><i>{{brand}}</i></b
        >
      </h5>
      <p>{{ brand.description.firstdes }}</p>
      <p >{{ brand.description.givenhowquest }}</p>
      <p >{{ brand.description.givenhowanswer }}</p>
      <ol>
        {{
          dose(brand)
        }}
        <li *ngFor="let vals of dosevals; let i = index">
          Dose {{ i + 1 }} : {{ vals }}
        </li>
      </ol>
      <p>{{ brand.description.brands.brandquest }}</p>
      <p>Check out the available brands</p>
      <p>{{ brand.description.brands.branddes }}</p>
      <form class="form-group" (ngSubmit)='dis(brand)' #brandsval="ngForm">
      <p>Kindly choose a brand</p>

      {{getVaccDes(index)}}
        <div *ngFor="let type of brandnew; let i = index">
          <input
            type="radio"
            class="mr-3 rad"
            #rad="ngModel"
            name="brandtype"
            value="{{ type.name + ' ' + type.price }}"
          />
          <label>{{ type.name + ' ' + type.price }}</label>
        </div>
        <button class="btn btn-primary px-4 my-2">Save</button>
      </form>
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
      if (this.profileService.brandtype[index]) {
        this.profileService.brandtype.splice(index, 1);
      } else {
        console.log(null);
      }
    }
    dosevals =[];
    dosekeys = [];
    brandnew= [];
    brands =[]

    dis(event) {
      this.profileService.dis(event);
    }
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
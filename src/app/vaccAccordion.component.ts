import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-vaccdion',
  template: `
    <div class="col accord" (click)="doses(brand.name, items, $event)">
      <small class="text-center"
        ><span>{{ brand.name + ' ' + '&#x20a6;' + brand.price }}</span>
      </small>
    </div>
  `,
  styles: [
    `
      .close {
        color: #fff;
        float: right;
        margin-left: 10px;
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
    `,
  ],
})
export class VaccAccordionComponent implements OnInit {
  @Input() brand;
  @Input() index;
  @Input() items: any;

  constructor(private profileService: ProfileService) {}
  ngOnInit() {}

  dosevals = [];
  dosekeys: any = {};
  brandnew = [];
  brands = [];
  description: any = {};
  eachbrandset: any = {};
  newItem: any = [];
  brandtypes = [];
  isOpen = false;
  dosereal = [];
  brandname = null;
  brandprice = null;
  newname = null;
  // newprice= []
  doses(brand, items, event) {
    // console.log(event.value)
    // console.log(items)
    this.isOpen = true;
    for (let d = 0; d < items.length; d++) {
      let item = items[d].description.brands.brandtype;

      for (let i = 0; i < item.length; i++) {
        if (brand === item[i].name) {
          this.newItem.push(items[d]);
          console.log(this.newItem);
          for (let l = 0; l < this.newItem.length; l++) {
            this.newname = this.newItem[l].name;
            this.description = this.newItem[l].description;
            this.brandtypes = this.newItem[l].description.brands.brandtype;
            this.eachbrandset = this.newItem[l].description.brands;
            this.dosevals = this.newItem[l].description.dosages;
            for (let w = 0; w < this.dosevals.length; w++) {
              this.dosekeys = this.dosevals[w].patientdosages;
            }
            this.dosereal = Object.values(this.dosekeys);
          }
        } else {
          console.log(null);
        }
      }
    }
  }
  change(type) {
    this.profileService.types(type);
  }

  dis(event) {
    this.profileService.dis(event);
  }
  // addPrices(price){
  //   const newprice = this.profileService.prices(price)
  // }
  getVaccDes(index) {
    this.brands = this.profileService.branddesItems;
    console.log(this.profileService.branddes[index]);
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
  onEdit(e) {
    // this.profileService.brands.splice(index, 1, brand);
    console.log(e);
    this.isOpen = false;
  }
}

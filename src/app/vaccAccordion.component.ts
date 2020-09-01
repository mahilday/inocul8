import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
    selector: "app-vaccdion",
    template:`
    <div class="col accord" (click)= "doses(brand.name, items, $event)">
    <small class="text-center"
      ><span>{{brand.name+ ' ' + '&#x20a6;' + brand.price}}</span>
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

  
    <form class="form-group" [ngClass] ="isOpen?'d-block':'d-none'" #newval="ngForm"> 
      <h5 class="my-3">
        <b
          ><i>{{ newname }}</i></b
        >
      </h5>
      
      
      <p>{{ description.firstdes }}</p>
      <p>{{ description.givenhowquest }}</p>
      <p>{{ description.givenhowanswer }}</p>
      <div *ngFor = "let dose of dosevals; let u = index">
      <label>{{dose.patient}}</label>
      <ol >
      <li *ngFor = "let doses of dosereal; let v = index">Dose {{v + 1}}: {{doses}}</li>
      </ol>
      </div>
      <p>{{ eachbrandset.brandquest }}</p>
      <p>Check out the available brands</p>
      <p>{{ eachbrandset.branddes }}</p>
    
      <p>Kindly choose a brand</p>
        <div *ngFor ="let type of brandtypes">
          <input
            type="radio"
            id="{{type.name}}{{i}}"
            name="vacctype"
            (click) = "change(type)"
            value="{name:{{type.name}}, price:{{type.price}}}"
            ngModel
          />{{type.name + ' ' + type.price}}
          
        </div>
        <button (click) = "onEdit($event)" class="btn btn-primary px-4 my-2">Edit</button>
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
  @Input() items: any;

  constructor(private profileService: ProfileService){

  }
    ngOnInit(){
     
    }
   
   
    dosevals =[];
    dosekeys: any = {};
    brandnew= [];
    brands =[]
    description:any = {}
    eachbrandset: any = {}
    newItem: any = []
    brandtypes = []
    isOpen = false
    dosereal = []
    brandname = null
    brandprice = null
    newname= null
    // newprice= []
    doses(brand,items, event){
      console.log(event.value)
      console.log(items)
      this.isOpen = true
      for(let d =0; d< items.length; d++){
      let item = items[d].description.brands.brandtype
      console.log(item)
      for(let i = 0; i < item.length; i++){
        if(brand === item[i].name){
          this.newItem.push(items[d])
          console.log(this.newItem)
          for(let l =0;l<this.newItem.length; l++){
            this.newname = this.newItem[l].name
            this.description = this.newItem[l].description
            this.brandtypes = this.newItem[l].description.brands.brandtype
            this.eachbrandset = this.newItem[l].description.brands
            this.dosevals = this.newItem[l].description.dosages
            for(let w = 0; w< this.dosevals.length; w++){
              this.dosekeys = this.dosevals[w].patientdosages
            }
            this.dosereal = Object.values(this.dosekeys)
          }
          
         
        } else{
          console.log(null)
        }
      }
    }
    }
    change(type){
      this.profileService.types(type)
    }
    deleteForm(brand, index) {
      for(let l =0;l<this.newItem.length; l++){
        let eachb = this.newItem[l].description.brands.brandtype
        for(let e =0;e<eachb.length; e++){
         if(brand === eachb[e].name){
            this.newItem.splice(l, 1)
         } else{
           console.log(null)
         }
       }
      }
      for(let y =0; y< this.profileService.selectedItem.length; y++){
        let eachitem = this.profileService.selectedItem[y].description.brands.brandtype
        for(let ei =0; ei<eachitem.length; ei++){
          if(brand === eachitem[ei].name){
            this.profileService.selectedItem.splice(y, 1)
            console.log(this.profileService.selectedItem)
          }else{
            console.log(null)
          }
        }
      }
     this.profileService.deleteForm(brand, index)
     console.log(brand)
     this.isOpen= false;
    }
    
    half(){
      this.isOpen = false
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
    onEdit(e) {
      // this.profileService.brands.splice(index, 1, brand);
      console.log(e);
      this.isOpen= false;
    }
}
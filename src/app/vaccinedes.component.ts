import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-vaccine',
  template: `
    <div class="vaccwrapper" [ngClass]="close? 'd-none':''"  >
    <form class="form-group"  (ngSubmit)='dis(brandsval)' #brandsval="ngForm"> 
      <h5 class="my-3"  [(ngModel)]= "vaccine.name">
        <b
          ><i>{{ vaccine.name }}</i></b
        >
      </h5>
      {{branddes(brandsval.value)}}
      <p >{{ vaccine.description.firstdes }}</p>
      <p >{{ vaccine.description.givenhowquest }}</p>
      <p >{{ vaccine.description.givenhowanswer }}</p>
      <ol>
        {{
          dose(vaccine)
        }}
        <li *ngFor="let vals of dosevals; let i = index">
          Dose {{ i + 1 }} : {{ vals }}
        </li>
      </ol>
      <p>{{ vaccine.description.brands.brandquest }}</p>
      <p>Check out the available brands</p>
      <p>{{ vaccine.description.brands.branddes }}</p>
    
      <p>Kindly choose a brand</p>
        <div *ngFor="let type of brand; let i = index">
          <input
            type="radio"
            class="mr-3 rad"
            name="vaccinetype"
            (change) = "showType(type)"
            value="{{ type.name + ' ' + type.price }}"
            [(ngModel)]="brandtype"
          />
          <label>{{ type.name }} : &#x20a6;{{type.price }}</label>
          
        </div>
        <button (click)="closeclick()" class="btn btn-primary px-4 my-2">Save</button>
        </form>
    </div>
  `,
  styles: [
    `
      .vaccwrapper {
        background: #29abe2;
        color: #fff;
        padding: 3em;
        margin: 1em 0;
        text-align: justify;
      }
      .rad:focus {
        border: none;
        outline: none;
      }
    `,
  ],
})
export class VaccineComponent implements OnInit {
  @Input() vaccine: any;
  @Input() index: number;

  dosekeys = [];
  dosevals = [];
  brandtype = [];
  brand = [];
  type = null
  dose = function (vacc) {
    vacc.description.dosages.map((dose: any) => {
      this.dosekeys = Object.keys(dose.patientdosages);
      this.dosevals = Object.values(dose.patientdosages);
    });
    this.brand = this.profileService.vaccine(vacc);
  };
  constructor(private profileService: ProfileService) {}
  close = false
  dis(event) {
    this.profileService.dis(event.value);
    // this.brandtype = this.profileService.brandtype;
    console.log(this.close)
  }
  closeclick(){
    this.close = this.profileService.close
    this.profileService.prices()
   
  }
  showType(type: number){
   this.type = this.profileService.types(type)

  }
  ngOnInit() {
  }
  branddes(value){
    this.profileService.branddes(value)
  }

 
}

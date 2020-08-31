import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-vaccine',
  template: `
  <form class="form-group"  (ngSubmit)='dis(brandsval)' #brandsval="ngForm">
    <div class="vaccwrapper" [ngClass]="close? 'd-none':''"  >
      <h5 class="my-3" name="Vaccname" [(ngModel)]= "vaccine.name">
        <b
          ><i>{{ vaccine.name }}</i></b
        >
      </h5>
      {{branddes(brandsval.value)}}
      <p name ="firstdes" [(ngModel)]= "vaccine.description.firstdes">{{ vaccine.description.firstdes }}</p>
      <p name ="firstquest" [(ngModel)]= "vaccine.description.givenhowquest">{{ vaccine.description.givenhowquest }}</p>
      <p name ="firstanswer" [(ngModel)]= "vaccine.description.givenhowanswer">{{ vaccine.description.givenhowanswer }}</p>
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
            #rad="ngModel"
            name="vaccinetype"
            value="{{ type.name + ' ' + type.price }}"
            [(ngModel)]="brandtype"
          />
          <label>{{ type.name + ' ' + type.price }}</label>
        </div>
        <button (click)="closeclick()" class="btn btn-primary px-4 my-2">Save</button>
    </div>
    </form>
  `,
  styles: [
    `
      .vaccwrapper {
        background: #29abe2;
        color: #fff;
        padding: 3em;
        margin: 3em 0;
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
  brandtype = null;
  brand = [];

  dose = function (vacc) {
    vacc.description.dosages.map((dose: any) => {
      this.dosekeys = Object.keys(dose.patientdosages);
      this.dosevals = Object.values(dose.patientdosages);
    });
    this.brand = vacc.description.brands.brandtype;
  };
  constructor(private profileService: ProfileService) {}
  close = false
  dis(event) {
    this.profileService.dis(event.value);
    this.brandtype = this.profileService.brandtype;
    console.log(this.close)
  }
  closeclick(){
    this.close = this.profileService.close
  }
  ngOnInit() {
  }
  branddes(value){
    this.profileService.branddes(value)
  }

 
}

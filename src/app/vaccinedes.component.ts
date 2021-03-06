import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-vaccine',
  template: `
    <div class="vaccwrapper" [ngClass]="close ? 'd-none' : ''">
      <h5 class="my-3" [(ngModel)]="vaccine.name">
        <b
          ><i>{{ vaccine.name }}</i></b
        >
      </h5>
      {{ branddes(brandsval.value) }}
      <p>{{ vaccine.description.firstdes }}</p>
      <p>{{ vaccine.description.givenhowquest }}</p>
      <p>{{ vaccine.description.givenhowanswer }}</p>
      
      <ol>
        {{
          dose(vaccine)
        }}
        <li *ngFor="let vals of dosevals; let i = index">
          Dose {{ i + 1 }} : {{ vals }} days to next vaccine stage
        </li>
      </ol>
      <p>{{ vaccine.description.brands.brandquest }}</p>
      <p>Check out the available brands</p>
      <p>{{ vaccine.description.brands.branddes }}</p>

      <p id="brands">Kindly choose a brand</p>
      <form class="form-group" (ngSubmit)="dis(brandsval)" #brandsval="ngForm">
        <label class="brandcheck" *ngFor="let type of brand; let i = index">
          <input
            type="radio"
            class="mr-3 rad"
            name="brandt"
            (change)="showType(type)"
            value="{name:{{ type.name }}, price:{{ type.price }}}"
            ngModel
          />
          <!--// // // hub service, dont show price because it will be concluded and
          paid in the hub // //0-->
          {{ type.name
          }}<span [ngClass]="home ? '' : 'd-none'">
            : &#x20a6;{{ type.price }}</span
          >
        </label>
        <button
          (click)="closeclick(func)"
          [disabled]="!valid"
          class="btn btn-primary px-4 my-2"
        >
          Save
        </button>
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
      .brandcheck {
        cursor: pointer;
        display: block;
      }
    `,
  ],
})
export class VaccineComponent implements OnInit {
  @Input() vaccine: any;
  @Input() index: number;
  @Input() func;
  //
  // home service vaccination
  //
  home = this.profileService.home;
  //
  // hub service vaccination
  //
  hub = this.profileService.hub;

  dosekeys = [];
  dosevals = [];
  brandtype = [];
  brand = [];
  ty = null;
  type = [];
  valid = false;
  dose = function (vacc) {
    vacc.description.dosages.map((dose: any) => {
      this.dosekeys = Object.keys(dose.patientdosages);
      this.dosevals = Object.values(dose.patientdosages);
    });
    this.brand = this.profileService.vaccine(vacc);
  };
  constructor(private profileService: ProfileService) {}
  close = false;
  dis(event) {
    this.profileService.dis(event.value);
    // this.brandtype = this.profileService.brandtype;
  }
  closenow = false;
  closeclick(func) {
    this.close = this.profileService.close;
    this.profileService.types(this.ty);
    this.profileService.prices();
  }
  showType = (type) => {
    this.ty = type;
    this.valid = true;
    if (this.ty !== null) {
      this.type.push(this.ty);
    } else {
      console.log(null);
    }
  };
  tobrands() {
    document.getElementById('brands').scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {}
  branddes(value) {
    this.profileService.branddes(value);
  }
}

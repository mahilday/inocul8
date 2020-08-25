import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vaccine',
  template: `
    <div>
      <div>{{ vaccine.name }}</div>
      <p>{{ vaccine.description.firstdes }}</p>
      <p>{{ vaccine.description.givenhowquest }}</p>
      <p>{{ vaccine.description.givenhowanswer }}</p>
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
      <div class="form-group">
        <div *ngFor="let type of brand; let i = index">
          <input
            type="radio"
            class="mr-5"
            name="vaccinetype"
            value="{{ type.name + ' ' + type.price }}"
            ngModel
          />
          <label>{{ type.name + ' ' + type.price }}</label>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class VaccineComponent implements OnInit {
  @Input() vaccine: any;
  @Input() index: number;

  dosekeys = [];
  dosevals = [];

  brand = [];

  dose = function (vacc) {
    vacc.description.dosages.map((dose: any) => {
      this.dosekeys = Object.keys(dose.patientdosages);
      this.dosevals = Object.values(dose.patientdosages);
    });
    this.brand = vacc.description.brands.brandtype;
  };

  ngOnInit() {}
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accordion',
  template: `
    <div class="col accord">
      <small class="text-center"
        ><span class="name" (click)="onShow()">{{
          profile.firstname + ' ' + profile.lastname
        }}</span>
        <button
          type="button"
          class="close"
          aria-label="Close"
          (click)="deleteForm(profile, index)"
        >
          <span aria-hidden="true">×</span>
        </button></small
      >
    </div>
    <div class="newclear" [ngClass]="show ? '' : 'd-none'">
      <div class="row ">
        <div class="col">
          <label for="firstname">First Name:</label>
          <input
            type="text"
            class="form-control"
            [ngModel]="profile.firstname"
            (ngModelChange)="profile.firstname = $event"
            id="firstname"
            placeholder="First Name"
            name="firstname"
          />
        </div>
        <div class="col">
          <label for="last name">Last Name:</label>
          <input
            type="text"
            class="form-control"
            [ngModel]="profile.lastname"
            (ngModelChange)="profile.lastname = $event"
            placeholder="Last Name"
            name="lastname"
          />
        </div>
      </div>
      <div class="row my-3">
        <div class="col">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            [ngModel]="profile.phone"
            (ngModelChange)="profile.phone = $event"
            class="form-control"
            placeholder="Phone Number"
            name="phone"
          />
        </div>
        <div class="col">
          <label for="age">Age:</label>
          <input
            type="number"
            class="form-control"
            [ngModel]="profile.age"
            (ngModelChange)="profile.age = $event"
            id="Age"
            placeholder="Enter your Age"
            name="age"
          />
        </div>
        <div class="col">
          <label for="email">Email:</label>
          <input
            type="text"
            class="form-control"
            id="email"
            [ngModel]="profile.email"
            (ngModelChange)="profile.email = $event"
            placeholder="Enter your Email"
            name="email"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="gender">Gender:</label>
          <select
            class="custom-select"
            name="gender"
            [ngModel]="profile.gender"
            (ngModelChange)="profile.gender = $event"
          >
            <option selected>Select your Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>
      <button
        class="btn btn-primary btn-sm mt-3 px-3"
        (click)="onEdit($event, profile, index)"
      >
        Edit Details
      </button>
    </div>
  `,
  styles: [
    `
      .close {
        float: right;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        border-radius: 50%;
        opacity: 1;
        transition: all 0.5s ease-in;
        position: absolute;
        text-align: center;
        height: 15px;
        width: 15px;
        margin-top: 3px;
        padding: none;
      }

      .name {
        cursor: pointer;
      }
      .close:hover {
        opacity: 1;
      }
      .accord {
        background: #29abe2;
        width: max-content;
        height: max-content;
        border-radius: 30px;
        color: #fff;
        z-index: 99;
      }
      .accord {
        padding-right: 20px;
        padding-left: 8px;
      }
      .newclear {
        position: absolute;
        z-index: 100;
        background: #29abe2;
        padding: 20px;
        margin: 1em 0;
        border-radius: 10px;
        transition: all 1s ease-in;
      }
    `,
  ],
})
export class AccordionComponent implements OnInit {
  @Input() profile;
  @Input() index;
  @Output() deleteItem = new EventEmitter<string>();
  show: boolean = false;
  ngOnInit() {}
  constructor(private profileService: ProfileService) {}
  //
  // check family profile array length
  checkProfLength() {
    if (this.profileService.profileData.length === 1) {
      this.profileService.profileAlert = true;
    }
    if (this.profileService.profileData.length >= 2) {
      this.profileService.profileAlert = false;
    }
  }
  //
  // delete profile for each added individual, then execute the checkProfLength func in the function below
  deleteForm(profile, index) {
    this.deleteItem.emit(profile);

    if (this.profileService.profileData[index]) {
      this.profileService.profileData.splice(index, 1);
      console.log(this.profileService.profileData);
      this.checkProfLength();
    } else {
      console.log(null);
    }
  }
  onShow() {
    this.show = true;
  }
  onEdit(e, profile, index) {
    e.preventDefault();
    this.profileService.profileData.splice(index, 1, profile);
    console.log(this.profileService.profileData[index]);
    this.show = false;
  }
}

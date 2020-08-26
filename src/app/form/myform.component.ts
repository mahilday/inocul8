import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'my-form',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyFormComponent implements OnInit {
  myself: boolean = false;
  family: boolean = false;
  corporate: boolean = false;
  home: boolean = false;
  hub: boolean = false;

  states = [];
  vaccine: Array<object> = [];
  localgovt = [];

  clickHome() {
    this.home = true;
    this.hub = false;
  }
  clickHub() {
    this.home = false;
    this.hub = true;
  }

  clickMyself() {
    this.myself = true;
    this.family = false;
    this.corporate = false;
    this.getState();
  }
  clickFamily() {
    this.myself = false;
    this.family = true;
    this.corporate = false;
    this.getState();
  }
  clickCorporate() {
    this.myself = false;
    this.family = false;
    this.corporate = true;
  }
  clickBack() {
    this.myself = false;
    this.family = false;
    this.corporate = false;
    console.log(this.profile);
  }
  constructor(
    private profileService: ProfileService,
    private http: HttpClient
  ) {}
  profile: Array<object> = [];
  formModel: any = {
    state: '',
    vaccines: [],
    vaccinetype: [],
  };
  famModel: any = {
    statefam: '',
    lgafam: '',
    preferredhubfam: '',
    addressfam: '',
    timefam: '',
    profile: this.profile,
    vaccines: '',
  };

  vaccineList = [];
  selectedItems: Array<object> = [];
  vaccSettings: IDropdownSettings = {};

  ngOnInit() {
    this.setProfile();
    this.vaccineList = [];
    this.vaccSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.getVaccines();
    this.vaccinetypes();
  }
  vaccinetypes = () => {
    this.formModel.vaccinetype.push(this.profileService.brandtype);
    console.log(this.formModel.vaccinetype);
  };

  onItemSelect(item: any) {
    console.log(this.formModel.vaccines);
    this.vaccineList.forEach((vaccine) => {
      if (item._id === vaccine._id) {
        this.selectedItems.push(vaccine);
        console.log(this.selectedItems);
      }
    });
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  corpModel: any = {};
  nopersons: number = this.profile.length;
  valid: boolean = false;
  // saveVaccine=(e, vacc: any)=>{
  //   e.preventDefault();
  //   this.vaccines.push(vacc)
  // }
  @Output() profileValues = new EventEmitter<string>();
  saveProfile = (e, profile: NgForm) => {
    e.preventDefault();
    this.profile.push(profile.value);
    this.nopersons += 1;
    this.profileValues.emit(profile.value);
  };

  resetProfile = (e, profile: FormGroup) => {
    e.preventDefault();
    profile.reset();
  };
  profileData: Array<object> = [];

  setProfile = () => {
    this.profileData = this.profileService.profileData;
  };

  postForm(val: NgForm) {
    let url = `${environment.baseUrl}/corporate-form`;

    this.http
      .post(url, val.value)
      .toPromise()
      .then((res: any) => {
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.valid);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  postMyForm(val: NgForm) {
    let url = `${environment.baseUrl}/my-form`;

    this.http
      .post(url, val.value)
      .toPromise()
      .then((res: any) => {
        console.log(res, this.valid);
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  postFamForm() {
    let url = `${environment.baseUrl}/family-form`;

    this.http
      .post(url, this.famModel)
      .toPromise()
      .then((res: any) => {
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.valid);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getVaccines = () => {
    this.http
      .get('http://localhost:3000/api/v1/vaccines')
      .toPromise()
      .then((res: any) => {
        this.vaccineList = res.result;
        console.log(this.vaccineList);
      });
  };

  getState = () => {
    this.http
      .get('http://locationsng-api.herokuapp.com/api/v1/states')
      .toPromise()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.states.push(res[i].name);
        }
        console.log(res, this.states, this.formModel.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getLga = () => {
    this.http
      .get(
        `http://locationsng-api.herokuapp.com/api/v1/states/${this.formModel.state}/lgas`
      )
      .toPromise()
      .then((res: any) => {
        // console.log(res.lgas, this.lga)
        this.localgovt = res;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getFamLga = () => {
    this.http
      .get(
        `http://locationsng-api.herokuapp.com/api/v1/states/${this.famModel.statefam}/lgas`
      )
      .toPromise()
      .then((res: any) => {
        // console.log(res.lgas, this.lga)
        this.localgovt = res;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  closeModal() {
    this.valid = false;
    this.getState();
  }
}

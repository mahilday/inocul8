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
  vaccineList = [];
  selectedItems = [];
  vaccSettings: IDropdownSettings = {};

  ngOnInit() {
    this.setProfile();
    this.vaccineList = [
      { item_id: 0, itemText: 'Hepatitis A Vaccine' },
      { item_id: 1, itemText: 'Hepatitis B Vaccine' },
      { item_id: 2, itemText: 'Cervical Cancer Vaccine' },
      { item_id: 1, itemText: 'Rotavirus Vaccine' },
      { item_id: 1, itemText: 'Meningitis Vaccine' },
      { item_id: 1, itemText: 'Typhoid Vaccine' },
      { item_id: 1, itemText: 'Yellow Fever Vaccine' },
      { item_id: 1, itemText: 'Chicken Pox Vaccine' },
      { item_id: 1, itemText: 'Pneumonia Vaccine' },
      { item_id: 1, itemText: 'Cholera Vaccine' },
      { item_id: 1, itemText: 'Human Papillomavirus(HPV) Vaccine' },
    ];
    this.selectedItems = [];
    this.vaccSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'itemText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  profile: Array<object> = [];
  formModel: any = {
    state: '',
    vaccines: '',
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

  constructor(
    private profileService: ProfileService,
    private http: HttpClient
  ) {}
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

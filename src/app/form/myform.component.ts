import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProfileService } from '../services/profile.service';
// import * as $ from 'jquery';
// declare var $: any;

@Component({
  selector: 'my-form',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyFormComponent implements OnInit {
  myself: boolean = false;
  family: boolean = false;
  corporate: boolean = false;
  home: boolean = true;
  hub: boolean = false;

  states = ['Lagos State'];
  vaccine: Array<object> = [];
  localgovt = [];
  allHubs = [
    { name: 'gorra hub', state: 'Lagos State', lga: 'Alimosho' },
    { name: 'fara hub', state: 'Lagos State', lga: 'Ibeju-Lekki' },
  ];

  clickHome() {
    this.home = true;
    this.hub = false;
    this.profileService.home = true;
    this.profileService.hub = false;
  }
  clickHub() {
    this.home = false;
    this.hub = true;
    this.profileService.home = false;
    this.profileService.hub = true;
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
    console.log(this.profiles);
    this.profileService.brands = [];
    this.formModel.vaccines = [];
    this.famModel.vaccines = [];
    this.profileService.brands.length = 0;
    this.home = false;
    this.hub = false;
    this.localgovt.length = 0;
  }
  constructor(
    public profileService: ProfileService,
    private http: HttpClient
  ) {}
  mainprice = null;
  brandtype = [];
  profiles: Array<object> = [];

  addPrices: Array<number> = this.profileService.price;
  pricesone = this.addPrices.reduce((a, b) => a + b, 0);
  newmainprice: Number = null;
  //
  //
  // individual form response object
  //
  //
  formModel: any = {
    state: 'Not applicable',
    lga: 'Not applicable',
    callcode: '+234'.trim(),
    phone: ''.trim(),
    radioservice: 'Home-service',
    paymentStatus: 'Not paid',
    brandschosen: this.profileService.brands,
    totalprice: null,
  };
  //
  // family form response object
  //
  //
  famModel: any = {
    radioservicefam: 'Home-service',
    statefam: 'Not applicable',
    lgafam: 'Not applicable',
    // callcodefam: '+234'.trim(),
    // phonefam: "".trim(),
    preferredhubfam: 'Not applicable',
    addressfam: '',
    timefam: '',
    profile: this.profileService.profileData,
    totalprice: null,
    paymentStatus: 'Not paid',
  };

  vaccineList = [];
  selectedItems: Array<any> = [];
  vaccSettings: IDropdownSettings = {};

  ngOnInit() {
    this.getCountryCodes()
    this.setProfile();
    this.setBrandtype();
    this.vaccineList = [];
    this.selectedItems = this.profileService.selectedItemsUpdate;
    this.vaccSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      enableCheckAll: false,
    };
    this.getVaccines();
    this.vaccinetypes();
    console.log(this.formModel.callcode);
    //
    //
    // paystack reference
    //
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }
  vaccinetypes = () => {
    this.formModel.vaccinetype = this.profileService.brandtype;
  };
  useSelected = [];
  //
  //
  // store new filtered hubs in newHubs variable
  newHubs = null;
  //
  //
  // filter hubs based on the state and lga chosen

  filterHubs = () => {
    this.newHubs = this.allHubs.filter(
      (hub) =>
        hub.state === this.formModel.state && hub.lga === this.formModel.lga
    );
  };
  //
  // family filter hubs according to state and lga
  filterFamHubs = () => {
    this.newHubs = this.allHubs.filter(
      (hub) =>
        hub.state === this.famModel.statefam && hub.lga === this.famModel.lgafam
    );
  };

  // deselect items function for individual
  //
  //
  onItemDeSelect(item: any) {
    console.log(this.brandtype, this.selectedItems);
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (item._id === this.selectedItems[i]._id) {
        let selected = this.selectedItems[i].description.brands.brandtype;
        for (let v = 0; v < selected.length; v++) {
          this.selectedItems.splice(i, 1);
          console.log(this.formModel.vaccines);
          for (let u = 0; u < this.brandtype.length; u++) {
            if (selected[v].name === this.brandtype[u].name) {
              this.brandtype.splice(u, 1);
            } else {
              console.log(null);
            }
          }
        }
      } else {
        console.log(null);
      }
    }
  }
  // deselecting items for family
  //
  //
  onFamItemDeSelect(item: any) {
    console.log(this.brandtype, this.vaccinesFam);
    for (let i = 0; i < this.vaccinesFam.length; i++) {
      if (item._id === this.vaccinesFam[i]._id) {
        let selected = this.vaccinesFam[i].description.brands.brandtype;
        for (let v = 0; v < selected.length; v++) {
          this.vaccinesFam.splice(i, 1);
          console.log(this.famModel.vaccines, this.famModel.profile);

          for (let u = 0; u < this.brandtype.length; u++) {
            if (selected[v].name === this.brandtype[u].name) {
              this.brandtype.splice(u, 1);
            } else {
              console.log(null);
            }
          }
        }
      } else {
        console.log(null);
      }
    }
  }
  vaccinesFam = [];
  // selecting items for individual form
  //
  //
  onItemSelect = (item: any) => {
    console.log(this.selectedItems);
    this.vaccineList.forEach((vaccine) => {
      if (item._id === vaccine._id) {
        this.selectedItems.push(vaccine);
        console.log(this.formModel.vaccines);
        this.profileService.selectedItem = this.selectedItems;
      }
    });
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (item._id === this.selectedItems[i]._id) {
        this.useSelected.push(Object.assign({}, this.selectedItems[i]));
        console.log(this.useSelected);
        let selected = this.selectedItems[i].description.brands.brandtype;
      } else {
        console.log(null);
      }
    }
    // smooth scrolling to each brand available
    this.profileService.tobrand();
  };
  // selecting items for family forms
  //
  //
  newFamSelect = [];
  onFamItemSelect(item: any) {
    console.log(this.vaccinesFam);
    this.vaccineList.forEach((vaccine) => {
      if (item._id === vaccine._id) {
        this.vaccinesFam.push(vaccine);
        this.profileService.selectedItem = this.vaccinesFam;
        console.log(this.profileService.selectedItem);
      }
    });
    console.log(this.famModel.vaccines, this.famModel.profile);
    for (let i = 0; i < this.vaccinesFam.length; i++) {
      if (item._id === this.vaccinesFam[i]._id) {
        this.newFamSelect.push(Object.assign({}, this.vaccinesFam[i]));
        console.log(this.newFamSelect);
        let selected = this.vaccinesFam[i].description.brands.brandtype;
      } else {
        console.log(null);
      }
    }
    // smooth scrolling family form
    // document
    //   .getElementById('description')
    //   .scrollIntoView({ behavior: 'smooth' });
  }

  onSelectAll(items: any) {
    console.log(items);
    console.log(this.addPrices);
  }

  corpModel: any = {
    callcode: "+234".trim(),
    phonecorp: "".trim()
  };
  nopersons: number = this.profiles.length;
  valid: boolean = false;

// profile object
  profilecallcode = "+234".trim()
  profilePhonefam = ''.trim()
  profileData: Array<object> = [];
  @Output() profileValues = new EventEmitter<string>();
  async saveProfile(e, profile: NgForm) {
    e.preventDefault();
    profile.value.brandschosen = [];
    for (let i = 0; i < this.profileService.brands.length; i++) {
      profile.value.brandschosen.push(this.profileService.brands[i]);
    }
    profile.value.phonefam = this.profilecallcode + this.profilePhonefam;
    this.profiles.push(profile.value);
    console.log(profile.value);
    this.profileValues.emit(profile.value);
    console.log(this.profiles);
    this.checkProfLength();
    setTimeout(() => {
      profile.reset();
      this.profileService.brands.length = 0;
    }, 1000);
  }
  famPrice = [];

  setProfile = () => {
    this.profileData = this.profileService.profileData;
  };
  brandFamType = null;
  setBrandtype = () => {
    this.brandtype = this.profileService.brands;
    this.brandFamType = this.profileService.brands;
  };
  title = '';
  // paystack start
  reference = '';
  paymentInit() {
    console.log('Payment initialized');
  }
  paymentDone(ref: any) {
    this.title = 'Payment successful';
    let otherurl = `${environment.baseUrl}/email`;
    let famotherurl = `${environment.baseUrl}/emailfam`;
    console.log(this.title, ref);
    let url = `${environment.baseUrl}/updatemy`;
    let famurl = `${environment.baseUrl}/updatefam`;
    if (this.myself === true) {
      this.formModel.paymentStatus = `Payment Done`;
      this.http
        .put(url, this.formModel)
        .toPromise()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => console.log('Error', err));

      this.http
        .post(otherurl, this.formModel)
        .toPromise()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      location.replace('https://www.inocul8.com.ng');
    } else {
      console.log(null);
    }
    if (this.family === true) {
      this.famModel.paymentStatus = `Payment Done`;
      this.http
        .put(famurl, this.famModel)
        .toPromise()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => console.log('Error', err));

      this.http
        .post(famotherurl, this.famModel)
        .toPromise()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      location.replace('https://www.inocul8.com.ng');
    }
  }

  paymentCancel() {
    alert('payment failed');
    this.formModel.paymentStatus = `Payment Unsuccessful`;
    location.replace('https://www.inocul8.com.ng');
  }

  postForm(val: NgForm) {
    let url = `${environment.baseUrl}/corporate-form`;
    this.loading = true;
    let famotherurl = `${environment.baseUrl}/emailcorp`;
    this.http
      .post(famotherurl, this.corpModel)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.http
      .post(url, this.corpModel)
      .toPromise()
      .then((res: any) => {
        this.loading = false;
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
  loading = false;
  eachEmail = null;
  postMyForm() {
    let url = `${environment.baseUrl}/my-form`;
    let otherurl = `${environment.baseUrl}/email`;
    this.loading = true;

    this.newmainprice = this.addPrices.reduce((a, b) => a + b, 0);
    console.log(this.newmainprice);
    this.formModel.totalprice = this.newmainprice;
    this.http
      .post(otherurl, this.formModel)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.http
      .post(url, this.formModel)
      .toPromise()
      .then((res: any) => {
        this.loading = false;
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.formModel.preferredhub);
        this.eachEmail = res.result.profile.email;
        console.log(this.eachEmail);
        this.mainprice = this.addPrices.reduce((a, b) => a + b, 0) * 100;
        this.newmainprice = this.addPrices.reduce((a, b) => a + b, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // check when profiles array length is less than two
  //

  profileAlert: boolean = this.profileService.profileAlert;

  checkProfLength() {
    if (this.profileService.profileData.length === 1) {
      this.profileService.profileAlert = true;
    }
    if (this.profileService.profileData.length >= 2) {
      this.profileService.profileAlert = false;
    }
    this.profileAlert = this.profileService.profileAlert;
  }

  famProfileError = 'please add at least two(2) profiles for family form';
  postFamForm() {
    let url = `${environment.baseUrl}/family-form`;
    this.loading = true;
    this.newmainprice = this.addPrices.reduce((a, b) => a + b, 0);
    this.famModel.totalprice = this.newmainprice;
    let famotherurl = `${environment.baseUrl}/emailfam`;
    this.http
      .post(famotherurl, this.famModel)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
    this.http
      .post(url, this.famModel)
      .toPromise()
      .then((res: any) => {
        this.loading = false;
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.valid);
        this.eachEmail = res.result.profile[0].email;
        this.mainprice = this.addPrices.reduce((a, b) => a + b, 0) * 100;
        this.newmainprice = this.addPrices.reduce((a, b) => a + b, 0);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  getVaccines = () => {
    this.http
      .get(`${environment.baseUrl}/vaccines`)
      .toPromise()
      .then((res: any) => {
        this.vaccineList = res.result;
        console.log(this.vaccineList);
      });
  };

  getState = () => {
    this.http
      .get(`${environment.baseUrl}/states`)
      .toPromise()
      .then((res: any) => {
        for (let v = 0; v < res.result.length; v++) {
          const statesne = res.result[v].states;
          console.log(statesne);
          for (let i = 0; i < statesne.length; i++) {
            // this.states.push(statesne[i].state.name);
          }
        }

        console.log(res.result, this.states, this.formModel.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  lgaLoading = false;
  getLga = () => {
    this.lgaLoading = true;
    this.http
      .get(`${environment.baseUrl}/states`)
      .toPromise()
      .then((res: any) => {
        this.lgaLoading = false;
        console.log(res);
        for (let v = 0; v < res.result.length; v++) {
          const statesne = res.result[v].states;
          for (let i = 0; i < statesne.length; i++) {
            if (this.formModel.state === statesne[i].state.name) {
              this.localgovt = statesne[i].state.locals;
            } else {
              console.log('not done');
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getFamLga = () => {
    this.lgaLoading = true;
    this.http
      .get(`${environment.baseUrl}/states`)
      .toPromise()
      .then((res: any) => {
        // console.log(res.lgas, this.lga)
        this.lgaLoading = false;
        console.log(res);
        for (let v = 0; v < res.result.length; v++) {
          const statesnorm = res.result[v].states;
          for (let i = 0; i < statesnorm.length; i++) {
            if (this.famModel.statefam === statesnorm[i].state.name) {
              this.localgovt = statesnorm[i].state.locals;
            } else {
              console.log('not done');
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  closeModal() {
    this.valid = false;
    this.getState();
  }
  // get country codes to add to the phone numbers inputted
  getCountryCodes(){
    this.profileService.getCountryCodes()
  }
}

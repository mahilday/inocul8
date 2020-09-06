import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProfileService } from '../services/profile.service';
import { JsonPipe } from '@angular/common';

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

  states = ["Lagos State"];
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
    this.profileService.brands = []
    this.formModel.vaccines = []
    this.famModel.vaccines =[]
    this.profileService.brands.length =0
    this.home = false
    this.hub = false
    this.localgovt.length = 0
    location.replace("http://127.0.0.1:4200")
  }
  constructor(
    private profileService: ProfileService,
    private http: HttpClient
  ) {}
  profile: Array<object> = [];
  formModel: any = {
    paymentStatus: 'Not paid'
  };
  famModel: any = {
    statefam: '',
    lgafam: '',
    preferredhubfam: '',
    addressfam: '',
    timefam: '',
    profile: this.profile,
    vaccines:[],
    paymentStatus: 'Not paid'
  };
  brandtype = [];
  addPrices: Array<number> = this.profileService.price

  vaccineList = [];
  selectedItems: Array<any> = [];
  vaccSettings: IDropdownSettings = {};

  ngOnInit() {
    this.setProfile();
    this.setBrandtype();
    this.vaccineList = [];
    this.selectedItems = this.profileService.selectedItemsUpdate
    this.vaccSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      enableCheckAll: false
    };
    this.getVaccines();
    this.vaccinetypes();
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }
  vaccinetypes = () => {
    this.formModel.vaccinetype=this.profileService.brandtype;
    console.log(this.formModel.vaccinetype);
  };
  useSelected = [];
 onItemDeSelect(item: any){
  console.log(this.brandtype, this.selectedItems)
  for(let i = 0; i < this.selectedItems.length; i++){
      if(item._id === this.selectedItems[i]._id){
        let selected = this.selectedItems[i].description.brands.brandtype
        for(let v = 0; v < selected.length; v++){
        this.selectedItems.splice(i, 1)
        console.log(this.formModel.vaccines)
        for(let u =0; u< this.brandtype.length; u++){
        if(selected[v].name === this.brandtype[u].name){
          this.brandtype.splice(u, 1)
          }else{
            console.log(null)
          }
        } 
      } 
  } else{
    console.log(null)
  }
}
 }
 onFamItemDeSelect(item: any){
  console.log(this.brandtype, this.vaccinesFam)
  for(let i = 0; i < this.vaccinesFam.length; i++){
      if(item._id === this.vaccinesFam[i]._id){
        let selected = this.vaccinesFam[i].description.brands.brandtype
        for(let v = 0; v < selected.length; v++){
        this.vaccinesFam.splice(i, 1)
        console.log(this.famModel.vaccines , this.famModel.profile)
        
        for(let u =0; u< this.brandtype.length; u++){
        if(selected[v].name === this.brandtype[u].name){
          this.brandtype.splice(u, 1)
          }else{
            console.log(null)
          }
        } 
      } 
  } else{
    console.log(null)
  }
}
 }
  vaccinesFam = []
  onItemSelect=(item: any)=> {
    console.log(this.selectedItems);
    this.vaccineList.forEach((vaccine) => {
      if (item._id === vaccine._id) {
        this.selectedItems.push(vaccine);
        console.log(this.formModel.vaccines)
        this.profileService.selectedItem = this.selectedItems
      }
    });
    for(let i = 0; i < this.selectedItems.length; i++){
      if(item._id === this.selectedItems[i]._id){
        this.useSelected.push(Object.assign({}, this.selectedItems[i])) 
          console.log(this.useSelected)
          let selected = this.selectedItems[i].description.brands.brandtype
          // for(let v = 0; v < selected.length; v++){
          //   for(let u =0; u< this.brandtype.length; u++){
          //   if(selected[v].name === this.brandtype[u].name){
              
             
          //     }else{
          //       console.log(null)
          //     }
          //   } 
          // } 
      } else{
        console.log(null)
      }
    }
  }
  newFamSelect =[]
  onFamItemSelect(item: any) {
   
    console.log(this.vaccinesFam);
    this.vaccineList.forEach((vaccine) => {
      if (item._id === vaccine._id) {
        this.vaccinesFam.push(vaccine);
        this.profileService.selectedItem = this.vaccinesFam
        console.log( this.profileService.selectedItem)
      }
    });
    console.log(this.famModel.vaccines, this.famModel.profile);
    for(let i = 0; i < this.vaccinesFam.length; i++){
      if(item._id === this.vaccinesFam[i]._id){
        this.newFamSelect.push(Object.assign({}, this.vaccinesFam[i])) 
          console.log(this.newFamSelect)
          let selected = this.vaccinesFam[i].description.brands.brandtype
          // for(let v = 0; v < selected.length; v++){
          //   for(let u =0; u< this.brandtype.length; u++){
          //   if(selected[v].name === this.brandtype[u].name){
              
             
          //     }else{
          //       console.log(null)
          //     }
          //   } 
          // } 
      } else{
        console.log(null)
      }
    }
  }
  
  onSelectAll(items: any) {
    console.log(items);
    console.log(this.addPrices)
  }
  mainprice = null
  
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
    console.log(profile.value)
    this.profileValues.emit(profile.value);
    
    setTimeout(()=>{
      profile.reset();
      this.profileService.brands.length = 0;
    }, 500)
  };
  

  profileData: Array<object> = [];

  setProfile = () => {
    this.profileData = this.profileService.profileData;
  };
  brandFamType = null
  setBrandtype =()=>{
    this.brandtype = this.profileService.brands;
    this.brandFamType = this.profileService.brands;
    
  }
  title = ''
// paystack start
reference = ''
paymentInit() {
  console.log('Payment initialized');
}
paymentDone(ref: any) {
  this.title = 'Payment successful'
  console.log(this.title, ref);
    let url = `${environment.baseUrl}/updatemy`
    this.formModel.paymentStatus = `Payment Done`
    this.http
      .patch(url, this.formModel)
      .toPromise()
      .then((res: any)=>{
        console.log(res)
      }).catch(err => console.log("Error", err))
  
}

paymentCancel() {
  alert('payment failed');
  this.formModel.paymentStatus = `Payment Unsuccessful`
}
newmainprice = null
  postForm(val: NgForm) {
    let url = `${environment.baseUrl}/corporate-form`;
    this.loading= true
    this.http
      .post(url, val.value)
      .toPromise()
      .then((res: any) => {
        this.loading = false
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
  loading = false
  eachEmail=null
  postMyForm() {
    let url = `${environment.baseUrl}/my-form`;
    let otherurl = `${environment.baseUrl}/email`
    this.loading= true
    this.http
      .post(otherurl,this.formModel)
      .toPromise()
      .then((res: any) => {
        console.log(res)
      })
      .catch((err) =>{
        console.log(err)
      })
    this.http
      .post(url, this.formModel)
      .toPromise()
      .then((res: any) => {
        this.loading= false
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.formModel.preferredhub)
        this.eachEmail = res.result.profile.email
        console.log(this.eachEmail)
        this.mainprice = this.addPrices.reduce((a,b) => a + b, 0) * 100
        this.newmainprice = this.addPrices.reduce((a,b) => a + b, 0)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  postFamForm() {
    let url = `${environment.baseUrl}/family-form`;
    this.loading = true
    this.http
      .post(url, this.famModel)
      .toPromise()
      .then((res: any) => {
        this.loading= false
        if ((res.status = 200)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        console.log(res, this.valid);
        this.eachEmail = res.result.profile[0].email
        this.mainprice = this.addPrices.reduce((a,b) => a + b, 0) * 100
        this.newmainprice = this.addPrices.reduce((a,b) => a + b, 0)
      })
      .catch((err) => {
        console.log(err);
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
        for(let v = 0; v < res.result.length; v++){
          const statesne = res.result[v].states;
          console.log(statesne)
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
  lgaLoading = false
  getLga = () => {
    this.lgaLoading = true
    this.http
    .get(
        `${environment.baseUrl}/states`
      )
      .toPromise()
      .then((res: any) => {
        this.lgaLoading = false
        console.log(res)
        for(let v = 0; v < res.result.length; v++){
          const statesne = res.result[v].states;
          for (let i = 0; i < statesne.length; i++) {
            if(this.formModel.state === statesne[i].state.name ){
                
              this.localgovt = statesne[i].state.locals
              
            } else{
              console.log("not done")
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getFamLga = () => {
    this.lgaLoading = true
    this.http
      .get(
        `${environment.baseUrl}/states`
      )
      .toPromise()
      .then((res: any) => {
        // console.log(res.lgas, this.lga)
        this.lgaLoading =false
        console.log(res);
        for(let v = 0; v < res.result.length; v++){
          const statesnorm = res.result[v].states;
          for (let i = 0; i < statesnorm.length; i++) {
            if(this.famModel.statefam === statesnorm[i].state.name ){
                
              this.localgovt = statesnorm[i].state.locals
              
            } else{
              console.log("not done")
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
}

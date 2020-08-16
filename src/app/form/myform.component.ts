import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup } from '@angular/forms';

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

  states = ['Anambra state', 'Edo state', 'Abia State'];
  vaccine: Array<string> = ['Measles', 'Polio'];
  lga: Array<string> = ['Uhunwonde', 'Ikpoba-Hill'];

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
  }
  clickFamily() {
    this.myself = false;
    this.family = true;
    this.corporate = false;
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
    console.log(this.profile)
  }
  ngOnInit(){

  }
  
  profile:Array<object>=[]
  formModel: any={}
  famModel: any={
    statefam:'',
    lgafam:'',
    preferredhubfam:'',
    addressfam:'',
    timefam:'',
    profile: this.profile
  }
  corpModel: any={}
  nopersons:number = this.profile.length
  valid: boolean = false
  saveProfile=(e, profile: object)=>{
    e.preventDefault();
    this.profile.push(profile)
    this.nopersons += 1;
  }
  resetProfile=(e, profile:FormGroup)=>{
    event.preventDefault()
    profile.reset()
  }
  
  constructor(private http: HttpClient) {}

  postForm(val: NgForm) {
    let url = 'http://localhost:3000/api/v1/corporate-form';
    
    this.http.post(url, val.value).toPromise().then((res: any)=>{
        this.valid= true
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
  }
  postMyForm(val: NgForm) {
    let url = 'http://localhost:3000/api/v1/my-form';

    this.http.post(url, val.value).toPromise().then((res: any) => {
      console.log(res)
      if(res.status){
        this.valid = true
      } else{
        this.valid = false
      }
     
    }).catch(err => {
      console.log(err)
    })
  }
  postFamForm() {
    let url = 'http://localhost:3000/api/v1/family-form';

    this.http.post(url, this.famModel).toPromise().then((res: any) => {
      this.valid = true
      console.log(res, this.valid)
      
    }).catch(err => {
      console.log(err)
    })
  }
}

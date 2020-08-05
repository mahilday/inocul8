import { Component } from '@angular/core';

@Component({
    selector: 'my-form',
    templateUrl: './myform.component.html',
    styleUrls: ['./myform.component.css']
})
export class MyFormComponent {
    myself: boolean = false;
    family: boolean = false;
    corporate:boolean = false;
    home:boolean = false;
    hub:boolean = false;

    states = [
        'Anambra state', 'Edo state', 'Abia State'
    ];
    vaccine: Array<string> =[
        "Measles","Polio"
    ]
    lga: Array<string> =[
        "Uhunwonde","Ikpoba-Hill"
    ]
    clickHome() {
        this.home = true;
        this.hub = false;
    }
    clickHub() {
        this.home = false;
        this.hub = true;
    }

    clickMyself(){
        this.myself = true;
        this.family = false;
        this.corporate = false
    }
    clickFamily() {
        this.myself = false;
        this.family = true;
        this.corporate = false
    }
    clickCorporate() {
        this.myself = false;
        this.family = false;
        this.corporate = true;
    }
    clickBack(){
        this.myself= false;
        this.family= false;
        this.corporate = false;
    }
}
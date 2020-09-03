import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class ="loginwrapper">
    <p>login</p>
  </div>
  `,
  styles: [`
  .loginwrapper{
      background-image: url('https://res.cloudinary.com/matsxript/image/upload/c_scale,w_6480/v1599153191/pexels-donald-tong-23273_yeoiaz.jpg');
      width:100vw;
      height:100vh;
  }
  `]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class ="loginwrapper">
  <img src="https://res.cloudinary.com/matsxript/image/upload/c_scale,w_3480/v1599153191/pexels-donald-tong-23273_yeoiaz.jpg" alt="blue"/>   
   <p>login</p>
  </div>
  `,
  styles: [`
  .loginwrapper{
      height:100vh;
      background:#29abe2;
      width:100vw;
  }
  .loginwrapper img{
      height:60%;
      width:100%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
  }
  `]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

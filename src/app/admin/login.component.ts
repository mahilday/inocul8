import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class ="loginwrapper">

  <img src="https://res.cloudinary.com/matsxript/image/upload/c_scale,w_4211/v1599153199/pexels-engin-akyurt-1435752_tohwsh.jpg" alt="blue"/>   
 <form class="loginform">
 <div class="form-group my-3">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group my-5">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-dark loginbtn">Submit</button>
 </form>
 <img class="secimg" src="https://res.cloudinary.com/matsxript/image/upload/c_scale,w_4211/v1599153199/pexels-engin-akyurt-1435752_tohwsh.jpg" alt="blue"/>   
  </div>
  `,
  styles: [`
  .loginform{
    width:40%;
    height:60vh;
    margin: auto 40%;
    transform:translateY(25%);
    position:relative;
    border-radius:30px;
    padding: 5%;
  }
  input{
    border-top:none;
    border-right:none;
    border-left:none;
    background:transparent;
    border-bottom: 1px solid #333;
  }
  .loginwrapper{
      height:100vh;
      width:100vw;
      position:relative;
  }
  .loginwrapper img{
      position:absolute;
      top:0vh;
      left:0vw;
      height:80%;
      width:40%;
      border-radius:33% 67% 100% 0% / 0% 0% 100% 100%  ;
      z-index:-12;
      animation: changerad 1s infinite ease;
  }
  
  .loginbtn{
    width:40%;
    margin:1vh auto;
    transform: translateX(70%);
    border-radius:30px;

  }
  `]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

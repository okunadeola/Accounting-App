import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppserviceService } from '../service/appservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public email: string = ''
  public password: any = "";
  public error: string = "";
  public success: string = "";
  public button: boolean = true;
  public userForm: FormGroup = this.form.group({})


  constructor(public route: Router, public form: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(8), Validators.required]]
    })

    
    // this.navigation.nav.next(true)
  }
  get f(){
    return this.userForm.controls
  }


  login() {


    if (localStorage.getItem('accountIt') !== null) {
      let arr: any = localStorage.getItem("accountIt")
      let arrData: any = JSON.parse(arr)
      let finder: any = arrData.find((val: any) => val.email === this.email && val.password === this.password)


      if (finder) {
        let user: any = []
        user.push({
          email: finder.email,
          password: finder.password
        })
        localStorage.setItem("accountLogin", JSON.stringify(user))
        this.route.navigate([`${finder.id}/dashboard/`])
      }
      else {
        this.error = "sorry user not found, kindly navigate to registration page or retry"
        this.alertNullifier()
      }
    } else {
      this.error = "You are not register, kindly navigate to the registration page"
      this.alertNullifier()
    }
  }


  removeAlert() {
    this.error = ''
  }

  alertNullifier() {
    setTimeout(() => {
      this.error = ''
    }, 5000)
  }

  infoNullifier() {
    setTimeout(() => {
      this.success = ''
    }, 1000)
  }

  logUp() {
    this.route.navigate(["/register"])
  }

  home(){
    this.route.navigate(['/']);
  }

}
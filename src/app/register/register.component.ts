import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppserviceService } from '../service/appservice.service';

interface Register {
  fullname: string;
  email: string;
  password: any;
  username: any;
  messageCatalogue: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public fullname: string = '';
  public email: string = '';
  public password: any = '';
  public error: string = '';
  public success: string = '';
  public button: boolean = true;
  public userConfirm: boolean = false;
  public emailConfirm: boolean = false;
  public passwordConfirm: boolean = false;
  public nameConfirm: boolean = true;
  public userForm: FormGroup = this.form.group({});

  public registerLog: Array<Register> = [];

  constructor(
    public route: Router,
    public form: FormBuilder,
    // public navigation: AppserviceService
  ) {}

  ngOnInit(): void {
    // this.navigation.nav.next(true);
    this.userForm = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  register() {
    if (
      this.fullname !== '' &&
      this.email !== '' &&
      this.username !== '' &&
      this.password !== ''
    ) {
      let form = this.userForm.value;
      form.id = Math.floor(Math.random() * 100000000000000);
      form.balance = 0;
      form.history = [];
      form.message = [];
      form.reportAchieve = []
      form.inventory = []
      form.sales = []
      form.purchase = []
      form.expenses = []
      form.income = []
      form.report  = []
      form.customers = []
      form.sellers = []
      form.generalAchieve = []
      form.printableComponent = []

      this.registerLog.push(form);

      if (localStorage.getItem('accountIt') !== null) {
        let arr: any = localStorage.getItem('accountIt');
        let arrData: any = JSON.parse(arr);
        let finder: any = arrData.find((val: any) => val.email === this.email);

        if (finder) {
          this.error = 'email is not availabe';
          this.alertNullifier();
        } else {
          if (localStorage.getItem('accountIt') === null) {
            localStorage.setItem(
              'accountIt',
              JSON.stringify(this.registerLog)
            );
          } else {
            let data: any = localStorage.getItem('accountIt');
            let newData = JSON.parse(data);
            newData.push(this.registerLog[this.registerLog.length - 1]);
            localStorage.setItem('accountIt', JSON.stringify(newData));
          }
          this.success = 'Your registration is successful!';
          this.infoNullifier();

          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 4000);

          // this.fullname = ''
          // this.username = ''
          // this.email = ''
          // this.password = ''
        }
      } else {
        if (localStorage.getItem('accountIt') === null) {
          localStorage.setItem(
            'accountIt',
            JSON.stringify(this.registerLog)
          );
        } else {
          let data: any = localStorage.getItem('accountIt');
          let newData = JSON.parse(data);
          newData.push(this.registerLog[this.registerLog.length - 1]);
          localStorage.setItem('accountIt', JSON.stringify(newData));
        }
        this.success = 'Your registration is successful!';
        this.infoNullifier();

        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 4000);
        this.fullname = '';
        this.username = '';
        this.email = '';
        this.password = '';
      }
    }
  }

  usernameValidator() {
    if (
      this.username !== '' &&
      this.username !== 'unknown' &&
      this.username !== 'null'
    ) {
      if (localStorage.getItem('chatRegister') !== null) {
        let arr: any = localStorage.getItem('chatRegister');
        let arrData: any = JSON.parse(arr);
        let finder: any = arrData.find(
          (val: any) => val.username === this.username
        );

        if (finder) {
          this.error = 'username is not availabe';
          this.alertNullifier();
        } else {
          this.userConfirm = true;
        }
      }
    } else if (this.username === 'unknown' || this.username === 'null') {
      this.error = 'username is not valid';
    }

    if (
      this.passwordConfirm &&
      this.emailConfirm &&
      this.username &&
      this.nameConfirm
    ) {
      this.button = false;
    }
  }

  emailValidator() {
    const re: any =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (this.email !== '') {
      if (!re.test(this.email) && this.email !== '') {
        this.error = 'email is not valid';
        this.alertNullifier();
      } else {
        this.emailConfirm = true;
      }
    }

    if (
      this.passwordConfirm &&
      this.emailConfirm &&
      this.username &&
      this.nameConfirm
    ) {
      this.button = false;
    }
  }

  passwordValidator() {
    const re: any = /^([a-zA-Z0-9_\-\.\W]){8,15}$/;
    if (this.password !== '') {
      if (!re.test(this.password)) {
        this.error = 'password is not valid';
        this.alertNullifier();
      } else {
        this.passwordConfirm = true;
      }
    }

    if (
      this.passwordConfirm &&
      this.emailConfirm &&
      this.username &&
      this.nameConfirm
    ) {
      this.button = false;
    }
  }

  removeAlert() {
    this.error = '';
  }

  alertNullifier() {
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  infoNullifier() {
    setTimeout(() => {
      this.success = '';
    }, 2000);
  }

  logUp() {
    this.route.navigate(['/login']);
  }
}

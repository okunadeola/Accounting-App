import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(public route : Router) { }

  ngOnInit(): void {
  }

  public showDash:any = true;
  public showInv:any = false;
  public showSales:any = false;

  showInvoice(){
    this.showDash = false;
    this.showInv=true;
    this.showSales = false
  }

  showSale(){
    this.showDash = false;
    this.showInv=false;
    this.showSales = true;
  }

  showDashboard(){
    this.showDash = true;
    this.showInv=false;
    this.showSales = false
  }

  login(){
    this.route.navigate(['/login']);
  }

  register(){
    this.route.navigate(['/register']);
  }
}


// this.nav.nav.next(true);
//     localStorage.removeItem('walletLogin');
//     this.route.navigate(['/']);

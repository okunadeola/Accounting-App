import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  // logout() {
  //   localStorage.removeItem('Auth')
  //   localStorage.removeItem('activeUser')
  //   this.router.navigate([`/signin`])
  // }
}

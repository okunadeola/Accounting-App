import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(public route : Router) { }

  ngOnInit(): void {
  }


  back(){
    this.route.navigate(["/"])
  }
  
}

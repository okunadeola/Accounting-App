import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Chart } from 'chart.js';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

  // canvas: any;
  // ctx: any;
  // @ViewChild('mychart') mychart:any;
  constructor(public actRoute : ActivatedRoute) { }
  public id :any
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );

      let loggedUser: any = localStorage.getItem('accountIt');
      let loggedArr: any = JSON.parse(loggedUser);

    }) 
  }
  

  // ngAfterViewInit() {
  //   this.canvas = this.mychart.nativeElement; 
  //   this.ctx = this.canvas.getContext('2d');

  //   new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //         datasets: [{
  //             label: 'Current Vallue',
  //             data: [0, 20, 40, 50],
  //             backgroundColor: "rgb(115 185 243 / 65%)",
  //             borderColor: "#007ee7",
  //             fill: true,
  //         },
  //         {
  //           label: 'Invested Amount',
  //           data: [0, 20, 40, 60, 80],
  //           backgroundColor: "#47a0e8",
  //           borderColor: "#007ee7",
  //           fill: true,
  //       }],
  //         labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
  //     },
  // });
  // }
  // displaymodal(){
  //   const dialogRef = this.dialog.open(Dialog2Component);
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });      
  //   }

}

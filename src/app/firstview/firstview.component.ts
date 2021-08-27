import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-firstview',
  templateUrl: './firstview.component.html',
  styleUrls: ['./firstview.component.css']
})
export class FirstviewComponent implements OnInit {

  public myChart :any
  public id :any 
  public sales :any 
  public inventory :any 
  public purchase :any 
  public startingInventory :any 
  public transactionHistory :any 
  constructor(public service : ServiceService) { }

  ngOnInit(): void {
  
    this.service.id.subscribe(data=>{
      this.id = data
    })
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let finder: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );

    this.transactionHistory = finder.history


    // calculating inventory value for since month begin to current value.
    let computation :any = 0
    let finalComputation :any = 0
    this.inventory = finder.inventory.map((total:any)=>{
      computation += total.quantity * total.unitCost
    return finalComputation += (total.quantity - total.quantityIssueFromSale) * total.unitCost })
    this.inventory = finalComputation
    this.startingInventory = computation

    // calculating sales for the month.
    let salesValue :any =0
    this.inventory = finder.sales.map((total:any)=>{
    return salesValue += (total.quantitySold * total.unitCost) - (total.discount)})
    this.sales = salesValue

    let purchaseValue :any =0
    this.purchase = finder.purchase.map((total:any)=>{
    return purchaseValue += (total.quantityPurchased * total.unitCost) - (total.discount)})
    this.purchase = purchaseValue

    let dat = 50  
    this.myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['Inventory', 'Sales', 'Purchase', ],
        datasets: [{
            label: 'Analysis For May',
            data: [computation, salesValue, purchaseValue],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)' 
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        // scales: {
        //     y: {
        //         beginAtZero: true
        //     }
        // }
    }
});





  }

  deleteHistory(index:any){
    if (confirm("are you sure you want to delete this item?")) {
      
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
        );
        finder.history.splice(index, 1)
        this.transactionHistory.splice(index, 1)
        let storageIndex :any= arrData.indexOf(finder);
        arrData[storageIndex] = finder;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
         
    }
  }

}

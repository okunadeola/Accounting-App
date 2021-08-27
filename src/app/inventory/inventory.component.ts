import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

  public id :any
  public user: any;
  public inventoryDate: any;
  public inventoryGood: any;
  public inventoryPrice: any;
  public inventoryQty: any;
  public inventoryNumber: any;


  constructor(public actRoute : ActivatedRoute) { }
  
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
    }) 
  }
  
}

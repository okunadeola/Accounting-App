import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-inventory-app',
  templateUrl: './inventory-app.component.html',
  styleUrls: ['./inventory-app.component.css']
})
export class InventoryAppComponent implements OnInit {

  public id :any
  public user: any;

  public inventory : any;
  public openingStock : any;
  public closingStock : any;
  public quantityFromSale : any;
  public error :any
  public success :any


  public inventoryDate: any;
  public inventoryGood: any;
  public inventoryCost: any;
  public inventoryQty: any;
  public inventoryNumber: any;

  public editinventoryDate: any;
  public editinventoryGood: any;
  public editinventoryCost: any;
  public editinventoryQty: any;
  public editinventoryNumber: any;

  public toggleInventory : boolean = true;
  public toggleInventoryName : string = "Add New Inventory";
  public edit : boolean = false;
  public editBttn: boolean = false;
  constructor(public actRoute : ActivatedRoute, public service : ServiceService) { }

  ngOnInit(): void {
    this.service.id.subscribe(data=>{
      this.id = data
    })
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let finder: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    this.user = finder 
    this.inventory = finder.inventory
    this.quantityFromSale =[]

    this.computation()
  
  }




  toggleAddInventory(){
    const form :any = document.getElementById("inventoryForm")
    if (this.toggleInventory) {
      form.classList.remove('close')
      this.toggleInventory = false 
      this.toggleInventoryName  = "Close" 
      this.editBttn = true   
    }else if (!this.toggleInventory) {
      form.classList.add('close');
      this.toggleInventory = true
      this.toggleInventoryName  = "Add New Inventory"  
      this.editBttn = false   
    }
  }





  saveInventory(){
    if (this.inventoryDate && this.inventoryNumber && this.inventoryGood && this.inventoryCost && this.inventoryQty) {
      
      let now = new Date();
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      let inventoryItemNo :any= finder.inventory.find((inv:any)=>
        Number(inv.inventoryNumber) === Number(this.inventoryNumber))
  
        let theGoodInInventory :any= finder.inventory.find((inv:any)=>{
          if (inv.itemName.toLowerCase() === this.inventoryGood.toLowerCase()) {
            return inv 
          }})
      
      if (!inventoryItemNo) {
        if (!theGoodInInventory) {
          this.success = "Inventory created successfully" 
          this.infoNullifier()       
          this.inventory.push({
            date: this.inventoryDate,
            inventoryNumber: this.inventoryNumber,
            itemName: this.inventoryGood,
            unitCost: this.inventoryCost,
            quantity: this.inventoryQty,
            quantityIssueFromSale : 0
          })
      
          finder.inventory.push({
            date: this.inventoryDate,
            inventoryNumber: this.inventoryNumber,
            itemName: this.inventoryGood,
            unitCost: this.inventoryCost,
            quantity: this.inventoryQty,
            quantityIssueFromSale : 0
          })
      
          finder.history.unshift({
            title : "Inventory Created",
            time : Date.now(),
            date : now.toDateString(),
            inventoryNumber: this.inventoryNumber,
            itemName: this.inventoryGood,
            quantity: this.inventoryQty,
            inventoryDate: this.inventoryDate
          })
      
          let index = arrData.indexOf(finder);
          arrData[index] = finder;
          localStorage.setItem('accountIt', JSON.stringify(arrData));
      
          this.computation()
          
          this.inventoryQty = ''
          this.inventoryCost = ''
          this.inventoryGood =''
          this.inventoryNumber = ''
          this.inventoryDate = '' 
        }else{
          this.error = "oops! item name already exist"
          this.alertNullifier()
        }
        
      }else{
        this.error = "oops! inventory number already exist"
        this.alertNullifier()
      }
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }


  }


  editInventoryButton(index:any){
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let finder: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    
    let inventoryItem :any= finder.inventory.find((inv:any)=>
      Number(inv.inventoryNumber) === Number(index))
    this.edit = true
    this.editinventoryQty = inventoryItem.quantity
    this.editinventoryCost = inventoryItem.unitCost
    this.editinventoryGood = inventoryItem.itemName
    this.editinventoryNumber = inventoryItem.inventoryNumber
    this.editinventoryDate = inventoryItem.date
  }
  

  cancelEdit(){
    this.edit = false
  }


  editInventory(){
    if (this.editinventoryDate && this.editinventoryNumber  && this.editinventoryGood && this.editinventoryCost  && this.editinventoryQty) {


      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      
      let inventoryItem :any= finder.inventory.find((inv:any)=>
        Number(inv.inventoryNumber) === Number(this.editinventoryNumber))
       
  
      let viewInventoryItem :any= this.inventory.find((inv:any)=>
        Number(inv.inventoryNumber) === Number(this.editinventoryNumber))
        
  
        viewInventoryItem.quantity = this.editinventoryQty
        viewInventoryItem.unitCost = this.editinventoryCost 
        viewInventoryItem.itemName = this.editinventoryGood
        viewInventoryItem.inventoryNumber = this.editinventoryNumber 
        viewInventoryItem.date = this.editinventoryDate
  
  
        inventoryItem.quantity = this.editinventoryQty
        inventoryItem.unitCost = this.editinventoryCost 
        inventoryItem.itemName = this.editinventoryGood
        inventoryItem.inventoryNumber = this.editinventoryNumber 
        inventoryItem.date = this.editinventoryDate
  
  
  
      this.computation()
      
      this.edit = false
  
      let index = arrData.indexOf(finder);
      arrData[index] = finder;
      localStorage.setItem('accountIt', JSON.stringify(arrData));
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }
      
  }




  deleteInventory(item :any, i :any){
    if (confirm("are you sure you want to delete this item?")) {
      
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let finder: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
        );
        finder.inventory.splice(i, 1)
        this.inventory.splice(i, 1)
        let storageIndex :any= arrData.indexOf(finder);
        arrData[storageIndex] = finder;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
        
        this.computation()
      
  }

}
  computation(){
      // calculate all good value for opening stock
      this.quantityFromSale =[]
      let computation :any = 0
      this.openingStock = this.inventory.map((total:any)=>{
        if (total.quantityIssueFromSale === 0) {
          this.quantityFromSale.push(0)
        }else{
          this.quantityFromSale.push(total.quantityIssueFromSale)
        }
        return computation += total.quantity * total.unitCost })
      this.openingStock = computation

      // calculate all remaining good value for closing stock
      let closingComputation :any = 0
      this.closingStock = this.inventory.map((total:any, i:any)=>{
        return closingComputation += (total.unitCost * total.quantity) - (this.quantityFromSale[i] * total.unitCost)  })
      this.closingStock = closingComputation
  }



  removeAlert() {
    this.error = '';
  }

  alertNullifier() {
    setTimeout(() => {
      this.error = '';
    }, 10000);
  }

  infoNullifier() {
    setTimeout(() => {
      this.success = '';
    }, 2000);
  }

}


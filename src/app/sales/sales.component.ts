import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {


  public id :any
  public user: any;

  public sales : any;
  public salesTotal : any;
  public error : any;
  public success: any;
  

  public goodsInInventory : any;



  public salesDate: any;
  public salesItem: any;
  public salesPrice: any;
  public salesQtyBought: any;
  public salesNumber: any;
  public salesCustomer: any;
  public salesDiscount: any;


  public editSalesDate: any;
  public editSalesItem: any;
  public editSalesPrice: any;
  public editSalesCustomer: any;
  public editSalesQtyBought: any;
  public editSalesNumber: any;
  public editSalesDiscount: any;

  public togglesales : boolean = true;
  public toggleSalesName : string = "Add New sales";
  public edit : boolean = false;
  public editBttn: boolean = false;
  constructor(public service : ServiceService) { }


  ngOnInit(): void {
    this.service.id.subscribe(data=>{
      this.id = data
    })
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let localStore: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    this.user = localStore 
    this.sales = localStore.sales
    
    // let myGood :any = []
    let inventoryGood = localStore.inventory.map((val:any)=> {
      return val.itemName
    })

    this.goodsInInventory = inventoryGood
    

    // calculating closing stock
    this.computation()
  }

  toggleAddSales(){
    const form :any = document.getElementById("salesForm")
    if (this.togglesales) {
      form.classList.remove('close')
      this.togglesales = false 
      this.toggleSalesName  = "Close" 
      this.editBttn = true   
    }else if (!this.togglesales) {
      form.classList.add('close');
      this.togglesales = true
      this.toggleSalesName  = "Add New sales"  
      this.editBttn = false   
    }
  }



  saveSales(){
    if (this.salesDate && this.salesNumber && this.salesItem && this.salesPrice && this.salesQtyBought && this.salesCustomer && this.salesDiscount >=0) {
      
      let now = new Date();
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      let inventoryItemNo :any= localStore.sales.find((inv:any)=>
      Number(inv.salesNumber) === Number(this.salesNumber))
  
      let goodInInventory :any= localStore.inventory.find((inv:any)=>{
        if (inv.itemName.toLowerCase() === this.salesItem.toLowerCase()) {
          return inv 
        }})
        
      if(goodInInventory){
          
          if (!inventoryItemNo) {
            
            this.success = "Sales added successfully" 
            this.infoNullifier()
            this.sales.push({
              date: this.salesDate,
              salesNumber: this.salesNumber,
              itemName: this.salesItem,
              unitCost: this.salesPrice,
              quantitySold: this.salesQtyBought,
              customer: this.salesCustomer,
              discount : this.salesDiscount,
              quantitySoldTracker : this.salesQtyBought
            })
            localStore.sales.push({
              date: this.salesDate,
              salesNumber: this.salesNumber,
              itemName: this.salesItem,
              unitCost: this.salesPrice,
              quantitySold: this.salesQtyBought,
              customer: this.salesCustomer,
              discount : this.salesDiscount,
              quantitySoldTracker : this.salesQtyBought
            })
        
            localStore.history.unshift({
              title : "Sales Created",
              time : Date.now(),
              date : now.toDateString(),
              salesNumber: this.salesNumber,
              itemName: this.salesItem,
              quantitySold: this.salesQtyBought,
              discount : this.salesDiscount,
              salesDate : this.salesDate
            })
        
            let theGoodInInventory :any= localStore.inventory.find((inv:any)=>{
              if (inv.itemName.toLowerCase() === this.salesItem.toLowerCase()) {
                return inv 
              }
        })
            if (theGoodInInventory) {
              theGoodInInventory.quantityIssueFromSale = this.salesQtyBought
            }
            
        
            let index = arrData.indexOf(localStore);
            arrData[index] = localStore;
            localStorage.setItem('accountIt', JSON.stringify(arrData));
        
        
            // calculating total
            this.computation()
        
            this.salesDate = ""
            this.salesItem = ""
            this.salesPrice = ""
            this.salesQtyBought = ""
            this.salesNumber = ""
            this.salesCustomer = "" 
            this.salesDiscount = ""
        }else{ 
          this.error = "oops! sales number already exist"
          this.alertNullifier()
        }
      }else{
        this.error = "oops! item name cannot be found in your inventory"
        this.alertNullifier()
      }
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }



  }



  
  editSalesButton(index:any){
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let localStore: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    
    let salesItem :any= localStore.sales.find((inv:any)=>
      Number(inv.salesNumber) === Number(index))
    this.edit = true
    this.editSalesDate = salesItem.date
    this.editSalesItem = salesItem.itemName
    this.editSalesPrice = salesItem.unitCost
    this.editSalesQtyBought =salesItem.quantitySold
    this.editSalesNumber =salesItem.salesNumber
    this.editSalesCustomer =salesItem.customer
    this.editSalesDiscount =salesItem.discount

   

  }
  

  cancelEdit(){
    this.edit = false
  }


  editSales(){
    if (this.editSalesDate  && this.editSalesNumber && this.editSalesItem && this.editSalesPrice  && this.editSalesQtyBought && this.editSalesCustomer && this.editSalesDiscount >=0) {


      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      
      let salesItem :any= localStore.sales.find((inv:any)=>
        Number(inv.salesNumber) === Number(this.editSalesNumber))
       
  
      let viewsalesItem :any= this.sales.find((inv:any)=>
        Number(inv.salesNumber) === Number(this.editSalesNumber))
  
        // frontend
        viewsalesItem.quantitySold =  this.editSalesQtyBought
        viewsalesItem.unitCost = this.editSalesPrice 
        viewsalesItem.itemName = this.editSalesItem
        viewsalesItem.salesNumber = this.editSalesNumber
        viewsalesItem.date = this.editSalesDate 
        viewsalesItem.customer = this.editSalesCustomer
        viewsalesItem.discount = this.editSalesDiscount
        viewsalesItem.quantitySoldTracker = this.editSalesQtyBought
  
        // localStorage
        salesItem.quantitySold =  this.editSalesQtyBought
        salesItem.unitCost = this.editSalesPrice 
        salesItem.itemName = this.editSalesItem
        salesItem.salesNumber = this.editSalesNumber
        salesItem.date = this.editSalesDate 
        salesItem.discount = this.editSalesDiscount
        salesItem.customer = this.editSalesCustomer
        salesItem.quantitySoldTracker = this.editSalesQtyBought
  
        let theGoodInInventory :any= localStore.inventory.find((inv:any)=>{
          if (inv.itemName.toLowerCase() === this.editSalesItem.toLowerCase()) {
            return inv 
          }
        })
        if (theGoodInInventory) {
          theGoodInInventory.quantityIssueFromSale = this.editSalesQtyBought
        }
  
        this.computation()
        let index = arrData.indexOf(localStore);
        arrData[index] = localStore;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
        this.success = "Sales edited successfully" 
        this.infoNullifier()
  
        this.edit = false   
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }
  }




  deleteSales(item :any, i :any){
    if (confirm("are you sure you want to delete this item?")) {
      
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
        );
        localStore.sales.splice(i, 1)
        this.sales.splice(i, 1)

        this.computation()
        let storageIndex :any= arrData.indexOf(localStore);
        arrData[storageIndex] = localStore;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
    }
  }


  computation(){
    let computation :any = 0
    this.salesTotal = this.sales.map((total:any)=>{
    return computation += total.quantitySold * total.unitCost - total.discount})
    this.salesTotal = computation
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

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public id :any
  public user: any;

  public purchase : any;
  public purchaseTotal : any;
  public error : any;
  public success: any;
  


  public purchaseDate: any;
  public purchaseItem: any;
  public unitCost: any;
  public purchaseQtyBought: any;
  public purchaseNumber: any;
  public supplier: any;
  public purchaseDiscount: any;


  public editPurchaseDate: any;
  public editPurchaseItem: any;
  public editUnitCost: any;
  public editSupplier: any;
  public editPurchaseQtyBought: any;
  public editPurchaseNumber: any;
  public editDiscountReceived: any;

  public togglePurchase : boolean = true;
  public togglePurchaseName : string = "Add New purchase";
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
    this.purchase = localStore.purchase

    // calculating total purchase
    this.computation()
  }

  toggleAddPurchase(){
    const form :any = document.getElementById("purchaseForm")
    if (this.togglePurchase ) {
      form.classList.remove('close')
      this.togglePurchase = false 
      this.togglePurchaseName  = "Close" 
      this.editBttn = true   
    }else if (!this.togglePurchase ) {
      form.classList.add('close');
      this.togglePurchase = true
      this.togglePurchaseName  = "Add New purchase"  
      this.editBttn = false   
    }
  }



  savePurchase(){
    if (this.purchaseDate && this.purchaseNumber && this.purchaseItem && this.unitCost && this.purchaseQtyBought && this.supplier && this.purchaseDiscount >=0) {
      
      let now = new Date();
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      let inventoryItemNo :any= localStore.purchase.find((inv:any)=>
      Number(inv.purchaseNumber) === Number(this.purchaseNumber))
          
          if (!inventoryItemNo) {
            
            this.success = "Sales added successfully" 
            this.infoNullifier()
            this.purchase.push({
              date: this.purchaseDate,
              purchaseNumber: this.purchaseNumber,
              itemName: this.purchaseItem,
              unitCost: this.unitCost,
              quantityPurchased: this.purchaseQtyBought,
              supplier: this.supplier,
              discount : this.purchaseDiscount,
            })
            localStore.purchase.push({
              date: this.purchaseDate,
              purchaseNumber: this.purchaseNumber,
              itemName: this.purchaseItem,
              unitCost: this.unitCost,
              quantityPurchased: this.purchaseQtyBought,
              supplier: this.supplier,
              discount : this.purchaseDiscount,
            })
        
            localStore.history.unshift({
              title : "Purchase Created",
              time : Date.now(),
              date : now.toDateString(),
              purchaseNumber: this.purchaseNumber,
              itemName: this.purchaseItem,
              supplier: this.supplier,
              quantityPurchased: this.purchaseQtyBought,
              discount : this.purchaseDiscount,
              purachseDate: this.purchaseDate,
            })
        
            let index = arrData.indexOf(localStore);
            arrData[index] = localStore;
            localStorage.setItem('accountIt', JSON.stringify(arrData));
        
        
            // calculating total
            this.computation()
        
            this.purchaseDate = ""
            this.purchaseItem = ""
            this.unitCost = ""
            this.purchaseQtyBought = ""
            this.purchaseNumber = ""
            this.supplier = "" 
            this.purchaseDiscount = ""
        }else{ 
          this.error = "oops! sales number already exist"
          this.alertNullifier()
        }
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }



  }



  
  editPurchaseButton(index:any){
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let localStore: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    
    let purchaseItem :any= localStore.purchase.find((inv:any)=>
      Number(inv.purchaseNumber) === Number(index))
    this.edit = true

    console.log(purchaseItem, index);
    
    this.editPurchaseDate = purchaseItem.date
    this.editPurchaseItem = purchaseItem.itemName
    this.editUnitCost = purchaseItem.unitCost
    this.editPurchaseQtyBought = purchaseItem.quantityPurchased
    this.editPurchaseNumber =purchaseItem.purchaseNumber
    this.editSupplier =purchaseItem.supplier
    this.editDiscountReceived =purchaseItem.discount

   

  }
  

  cancelEdit(){
    this.edit = false
  }


  editPurchase(){
    if (this.editPurchaseDate  && this.editPurchaseNumber && this.editPurchaseItem && this.editUnitCost  && this.editPurchaseQtyBought && this.editSupplier && this.editDiscountReceived >=0) {


      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      
      let purchaseItem :any= localStore.purchase.find((inv:any)=>
        Number(inv.purchaseNumber) === Number(this.editPurchaseNumber))
       
  
      let viewPurchaseItem :any= this.purchase.find((inv:any)=>
        Number(inv.purchaseNumber) === Number(this.editPurchaseNumber))
  
        // frontend
        viewPurchaseItem.quantityPurchased =  this.editPurchaseQtyBought
        viewPurchaseItem.unitCost = this.editUnitCost
        viewPurchaseItem.itemName = this.editPurchaseItem
        viewPurchaseItem.purchaseNumber = this.editPurchaseNumber
        viewPurchaseItem.date = this.editPurchaseDate
        viewPurchaseItem.supplier = this.editSupplier
        viewPurchaseItem.discount = this.editDiscountReceived
    
  
        // localStorage
        purchaseItem.quantityPurchased =  this.editPurchaseQtyBought
        purchaseItem.unitCost = this.editUnitCost
        purchaseItem.itemName = this.editPurchaseItem
        purchaseItem.purchaseNumber = this.editPurchaseNumber
        purchaseItem.date = this.editPurchaseDate
        purchaseItem.supplier = this.editSupplier
        purchaseItem.discount = this.editDiscountReceived
  
         // calculating total
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




  deletePurchase(item :any, i :any){
    if (confirm("are you sure you want to delete this item?")) {
      
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
        );
        localStore.purchase.splice(i, 1)
        this.purchase.splice(i, 1)

         // calculating total
        this.computation()

        let storageIndex :any= arrData.indexOf(localStore);
        arrData[storageIndex] = localStore;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
    }
  }


  computation(){
    let computation :any = 0
    this.purchaseTotal = this.purchase.map((total:any)=>{
    return computation += total.quantityPurchased * total.unitCost - total.discount})
    this.purchaseTotal = computation
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


import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public id :any
  public user: any;

  public expenses : any;
  public expensesTotal : any;
  public error : any;
  public success: any;
  


  public expensesDate: any;
  public desription: any;
  public amountPaid: any;
  public paymentType: any;
  public expensesNumber: any;
  public outstandingPayment: any;
  public prepaid: any;


  public editExpensesDate: any;
  public editExpensesNumber: any;
  public editDescription: any;
  public editAmountPaid: any;
  public editPaymentType: any;
  public editOutstandingPayment: any;
  public editPrepaid: any;

  public toggleExpenses : boolean = true;
  public toggleExpensesName : string = "Add New purchase";
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
    this.expenses = localStore.expenses

    // calculating total purchase
    this.computation()
  }

  toggleAddExpenses(){
    const form :any = document.getElementById("expensesForm")
    if (this.toggleExpenses ) {
      form.classList.remove('close')
      this.toggleExpenses = false 
      this.toggleExpensesName  = "Close" 
      this.editBttn = true   
    }else if (!this.toggleExpenses) {
      form.classList.add('close');
      this.toggleExpenses = true
      this.toggleExpensesName  = "Add New Expenses"  
      this.editBttn = false   
    }
  }



  saveExpenses(){
    if (this.expensesDate && this.desription && this.amountPaid && this.paymentType && this.expensesNumber && this.outstandingPayment >=0 && this.prepaid >=0) {
      
      if (!this.outstandingPayment || !this.prepaid) {
        
        let now = new Date();
        let arr: any = localStorage.getItem('accountIt');
        let arrData: any = JSON.parse(arr);
        let localStore: any = arrData.find(
          (val: any) => Number(val.id) === Number(this.id)
        );
        let inventoryItemNo :any= localStore.expenses.find((inv:any)=>
        Number(inv.expensesNumber) === Number(this.expensesNumber))
            
            if (!inventoryItemNo) {
              
              this.success = "expenses added successfully" 
              this.infoNullifier()
              this.expenses.push({
                date: this.expensesDate,
                expensesNumber: this.expensesNumber,
                description: this.desription,
                amountPaid: this.amountPaid,
                outstandingPayment:this.outstandingPayment,
                paymentType: this.paymentType,
                prepaid : this.prepaid,
              })
              localStore.expenses.push({
                date: this.expensesDate,
                expensesNumber: this.expensesNumber,
                description: this.desription,
                amountPaid: this.amountPaid,
                outstandingPayment:this.outstandingPayment,
                paymentType: this.paymentType,
                prepaid : this.prepaid,
              })
          
              localStore.history.unshift({
                title : "Expenses Created",
                time : Date.now(),
                date : now.toDateString(),
                expensesNumber: this.expensesNumber,
                description: this.desription,
                amountPaid: this.amountPaid,
                outstandingPayment:this.outstandingPayment,
                paymentType: this.paymentType,
                prepaid : this.prepaid,
                expensesDate: this.expensesDate
              })
          
              let index = arrData.indexOf(localStore);
              arrData[index] = localStore;
              localStorage.setItem('accountIt', JSON.stringify(arrData));
          
          
              // calculating total
              this.computation()
  
              this.expensesDate= ""
              this.desription= ""
              this.amountPaid= ""
              this.paymentType= ""
              this.expensesNumber= ""
              this.outstandingPayment= ""
              this.prepaid= ""
            }else{ 
              this.error = "oops! expenses number already exist"
              this.alertNullifier()
          }       
      }else{
        this.error = "oops! you can only have outstanding or prepaid payment. not both at the same time"
        this.alertNullifier()
      }
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }



  }



  
  editExpensesButton(index:any){
    let arr: any = localStorage.getItem('accountIt');
    let arrData: any = JSON.parse(arr);
    let localStore: any = arrData.find(
      (val: any) => Number(val.id) === Number(this.id)
    );
    
    let expensesItem :any= localStore.expenses.find((inv:any)=>
      Number(inv.expensesNumber) === Number(index))
    this.edit = true

    
     this.editExpensesDate = expensesItem.date;
     this.editExpensesNumber =expensesItem.expensesNumber;
     this.editDescription =expensesItem.description ;
     this.editAmountPaid = expensesItem.amountPaid;
     this.editPaymentType =expensesItem.paymentType ;
     this.editOutstandingPayment = expensesItem.outstandingPayment;
     this.editPrepaid = expensesItem.prepaid ;

  }
  

  cancelEdit(){
    this.edit = false
  }


  editExpenses(){
    
    if (this.editExpensesDate  && this.editExpensesNumber && this.editDescription && this.editAmountPaid  &&  this.editPaymentType &&  this.editOutstandingPayment >=0 && this.editPrepaid >=0) {


      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
      );
      
      let expensesItem :any= localStore.expenses.find((inv:any)=>
        Number(inv.expensesNumber) === Number(this.editExpensesNumber))
       
  
      let viewExpensesItem :any= this.expenses.find((inv:any)=>
        Number(inv.expensesNumber) === Number(this.editExpensesNumber))

        console.log(expensesItem, viewExpensesItem);
        
  
        // frontend
        viewExpensesItem.date =  this.editExpensesDate 
        viewExpensesItem.expensesNumber = this.editExpensesNumber
        viewExpensesItem.description = this.editDescription
        viewExpensesItem.amountPaid = this.editAmountPaid
        viewExpensesItem.paymentType = this.editPaymentType
        viewExpensesItem.outstandingPayment = this.editOutstandingPayment
        viewExpensesItem.prepaid = this.editPrepaid
    
  
        // localStorage
        expensesItem.date =  this.editExpensesDate 
        expensesItem.expensesNumber = this.editExpensesNumber
        expensesItem.description = this.editDescription
        expensesItem.amountPaid = this.editAmountPaid
        expensesItem.paymentType = this.editPaymentType
        expensesItem.outstandingPayment = this.editOutstandingPayment
        expensesItem.prepaid = this.editPrepaid
  
         // calculating total
        this.computation()

        let index = arrData.indexOf(localStore);
        arrData[index] = localStore;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
        this.success = "Expenses edited successfully" 
        this.infoNullifier()
  
        this.edit = false   
    }else{
      this.error = "all fields must be filled"
      this.alertNullifier()
    }
  }




  deleteExpenses(item :any, i :any){
    if (confirm("are you sure you want to delete this item?")) {
      
      let arr: any = localStorage.getItem('accountIt');
      let arrData: any = JSON.parse(arr);
      let localStore: any = arrData.find(
        (val: any) => Number(val.id) === Number(this.id)
        );
        localStore.expenses.splice(i, 1)
        this.expenses.splice(i, 1)

         // calculating total
        this.computation()

        let storageIndex :any= arrData.indexOf(localStore);
        arrData[storageIndex] = localStore;
        localStorage.setItem('accountIt', JSON.stringify(arrData));
    }
  }


  computation(){
    let computation :any = 0
    this.expensesTotal = this.expenses.map((total:any)=>{
      if (total.outstandingPayment) {
        return computation += total.amountPaid + total.outstandingPayment
      }
      else if (total.prepaid) {
        return computation += total.amountPaid - total.prepaid
      }
      else if (total.prepaid == 0 && total.outstandingPayment == 0) {
        return computation += total.amountPaid
      }
    })
    this.expensesTotal = computation
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


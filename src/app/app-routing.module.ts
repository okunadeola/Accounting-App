import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FirstviewComponent } from './firstview/firstview.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NavComponent } from './nav/nav.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { SalesComponent } from './sales/sales.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {path: '', component :TemplateComponent},
  {path: 'login', component :LoginComponent},
  {path: 'register', component :RegisterComponent},
  {path: 'main', component:DashboardComponent},
  {path : ':id/dashboard', component:MainViewComponent, children: [
    {path: '', component: FirstviewComponent },
    {path: 'inventory', component: InventoryComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'purchase', component: PurchaseComponent},
    {path: 'expenses', component: ExpensesComponent},
    {path: 'report', component:ReportComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

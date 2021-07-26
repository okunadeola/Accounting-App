import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {path: '', component :TemplateComponent},
  // {path : 'dashboard', children: [
  //   {path: '', redirectTo: '/dashboard/home', pathMatch:'full'},
  // ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

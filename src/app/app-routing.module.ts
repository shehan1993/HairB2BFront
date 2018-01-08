import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { SalonViewComponent } from './salon-view/salon-view.component'
import { HomeComponent } from './home/home.component'
import { CalenComponent } from './calen/calen.component'

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'salon-view',component:SalonViewComponent},
  {path:'home',component:HomeComponent},
  {path:'calendar',component:CalenComponent},
  {path:'salon-view/:id',component:SalonViewComponent}

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }

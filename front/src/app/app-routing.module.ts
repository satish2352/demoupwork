import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './contact/add/add.component';
import { EditComponent } from './contact/edit/edit.component';

// import { EditComponent } from './contact/add/edit.component';
import { ListComponent } from './contact/list/list.component';


import { AdmindashboardComponent } from './admindashboard/admindashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: 'add', component: AddComponent },

  { path: 'admin', component: AdmindashboardComponent,
    children: [
    // { path: 'add', component: AddComponent , canActivate: [AuthGuard] },
    { path: 'list', component: ListComponent },     
    { path: 'add', component: AddComponent },    
   
    { path: 'edit/:id', component: EditComponent },


    
    
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

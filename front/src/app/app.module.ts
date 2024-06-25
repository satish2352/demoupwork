import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './contact/add/add.component';
import { ListComponent } from './contact/list/list.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EditComponent } from './contact/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    AdmindashboardComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

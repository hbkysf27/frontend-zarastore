import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesService } from '@zarafe/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';


const UX_MODULE=[
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule


]


const routes: Routes = [
  {
    path:'',
    component:ShellComponent,
    children : [
      {
        path:'dashboard',
        component:DashboardComponent
    },
    {
      path:'categories',
      component:CategoriesListComponent
  },
  {
    path:'categories/form',
    component:CategoriesFormComponent
},
{
  path:'categories/form/:id',
  component:CategoriesFormComponent
},


]
}
];
@NgModule({
    declarations: [AppComponent,SidebarComponent,ShellComponent,DashboardComponent, CategoriesListComponent, CategoriesFormComponent],
    imports: [BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule, RouterModule.forRoot(routes , { initialNavigation: 'enabledBlocking' }),
      ...UX_MODULE,
      CardModule,
      FormsModule,
      ReactiveFormsModule,



  ],
    providers: [CategoriesService, MessageService,ConfirmationService],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}

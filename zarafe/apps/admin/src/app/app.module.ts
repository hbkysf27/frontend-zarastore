import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';

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


const UX_MODULE=[
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,

]


const routes: Routes = [
  {
    path:'',
    component:ShellComponent,
    children : [
      {
        path:'dashboard',
        component:DashboardComponent
    }, {
      path:'categories',
      component:CategoriesListComponent
  },


]
}
];
@NgModule({
    declarations: [AppComponent,SidebarComponent,ShellComponent,DashboardComponent, CategoriesListComponent],
    imports: [BrowserModule,
      HttpClientModule, RouterModule.forRoot(routes , { initialNavigation: 'enabledBlocking' }),
      ...UX_MODULE,
      CardModule,


  ],
    providers: [CategoriesService],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}

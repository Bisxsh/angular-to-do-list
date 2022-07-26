import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SideMenuOptionComponent} from "./components/sidebar/sub-components/common/side-menu-option/side-menu-option.component";
import {SideMenuTaskComponent} from "./components/sidebar/sub-components/side-menu-task/side-menu-task.component";
import {SideMenuFilterComponent} from "./components/sidebar/sub-components/side-menu-filter/side-menu-filter.component";

@NgModule({
  declarations: [
    AppComponent,
    SideMenuOptionComponent,
    SideMenuTaskComponent,
    SideMenuFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SideMenuOptionComponent} from "./components/side-bar/sub-components/side-menu-option/side-menu-option.component";
import {SideMenuTaskComponent} from "./components/side-bar/sub-components/side-menu-task/side-menu-task.component";
import {SideMenuFilterComponent} from "./components/side-bar/sub-components/side-menu-filter/side-menu-filter.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    SideMenuOptionComponent,
    SideMenuTaskComponent,
    SideMenuFilterComponent,
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SideMenuOptionComponent} from "./components/side-bar/sub-components/side-menu-option/side-menu-option.component";
import {SideMenuTaskComponent} from "./components/side-bar/sub-components/side-menu-task/side-menu-task.component";
import {SideMenuFilterComponent} from "./components/side-bar/sub-components/side-menu-filter/side-menu-filter.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuOptionComponent,
    SideMenuTaskComponent,
    SideMenuFilterComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SideMenuOptionComponent} from "./components/side-bar/sub-components/side-menu-option/side-menu-option.component";
import {SideMenuFilterComponent} from "./components/side-bar/sub-components/side-menu-filter/side-menu-filter.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component'
import {FormsModule} from "@angular/forms";
import { EditorComponent } from './components/editor/editor.component';
import {SideMenuTaskComponent} from "./components/side-bar/sub-components/side-menu-task/side-menu-task.component";
import { ActionButtonComponent } from './components/action-button/action-button.component';
import {
  DeleteAllButtonComponent
} from "./components/action-button/sub-components/delete-all-button/delete-all-button.component";
import {
  AddTaskButtonComponent
} from "./components/action-button/sub-components/add-task-button/add-task-button.component";
import {InfoButtonComponent} from "./components/action-button/sub-components/info-button/info-button.component";

@NgModule({
  declarations: [
    AppComponent,
    SideMenuOptionComponent,
    SideMenuTaskComponent,
    SideMenuFilterComponent,
    SideBarComponent,
    HeaderComponent,
    EditorComponent,
    ActionButtonComponent,
    DeleteAllButtonComponent,
    AddTaskButtonComponent,
    InfoButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

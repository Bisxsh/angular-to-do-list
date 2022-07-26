import { Component } from '@angular/core';
import { filters } from './util/Filters'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  filters: IFilter[] = filters;

  tasks!: object[];


}

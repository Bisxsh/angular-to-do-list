import {Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu-filter',
  templateUrl: './side-menu-filter.component.html',
  styleUrls: ['./side-menu-filter.component.css']
})
export class SideMenuFilterComponent {

  @Input() label: string = "";
  @Input() iconName: string = "";
  @Input() active!: boolean;

}

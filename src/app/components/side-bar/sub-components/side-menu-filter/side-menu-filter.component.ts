import {Component, Input } from '@angular/core';
import {TaskService} from "../../../../../services/task.service";

@Component({
  selector: 'app-side-menu-filter',
  templateUrl: './side-menu-filter.component.html',
  styleUrls: ['./side-menu-filter.component.css']
})
export class SideMenuFilterComponent {

  @Input() label: string = "";
  @Input() iconName: string = "";
  @Input() active!: boolean;
  @Input() id!:number;

  constructor(private service: TaskService) { }

  setFilterApplied() {
    this.service.changeFilterApplied(this.id);
  }

}

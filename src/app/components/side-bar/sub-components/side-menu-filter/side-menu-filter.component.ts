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

  private _filters!: IFilter[];

  constructor(private service: TaskService) {
    this.service.filters.subscribe(f => this._filters = f);
  }

  setFilterApplied() {
    this.service.changeFilterApplied(this.id);
    let temp = this._filters.map(f => {
      if (f.active && f.id!=this.id) return {
        ...f,
        active: false
      }
      if (f.id == this.id) return {
        ...f,
        active:true
      }
      return f;
    })
    this.service.changeFilters(temp);
  }

}

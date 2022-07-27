import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { filters } from './util/Filters'
import { ITask } from "../../../interfaces/ITask";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  filters: IFilter[] = filters;
  active!: number;

  @Input() tasks: ITask[] | undefined;
  @Output('activeChanged') eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  taskClickHandler(data: any) {
    if (data === this.active) return;

    this.active = data;
    this.activeTaskChanged();
  }

  activeTaskChanged() {
    this.eventEmitter.emit(this.active);
  }

}

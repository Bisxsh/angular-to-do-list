import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { filters } from './util/Filters'
import { ITask } from "../../../interfaces/ITask";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnChanges{

  filters: IFilter[] = filters;

  @Input() tasks: ITask[] | undefined;

  tasksList!: ITask[] | [];

  ngOnChanges(changes: SimpleChanges): void {
    this.tasksList = this.tasks || [];
  }


}

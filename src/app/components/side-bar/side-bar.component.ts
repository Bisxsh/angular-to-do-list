import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filters, filters} from './util/Filters'
import { ITask } from "../../../interfaces/ITask";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  filters: IFilter[] = filters;
  activeTask!: ITask;
  active!: number;
  tasks!: ITask[];
  filterApplied!: number;

  @Output('deleteTask') deleteEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
    this.service.filterApplied.subscribe(f => this.filterApplied = f);
  }

  taskClickHandler(data: any) {
    if (data === this.active) return;

    this.active = data;
    this.activeTaskChanged(data);
  }

  deleteTaskHandler(data: any) {
    this.deleteEmitter.emit(data)
  }

  activeTaskChanged(index: number) {
    let tempTasks =  this.tasks.map(t => {
      if (t.active) {
        return {
          ...t,
          active: false
        }
      }

      if (index == t.id) {
        this.service.changeActiveTask(t);
        return {
          ...t,
          active: true
        }
      }

      return t;
    })
    this.service.changeTasks(tempTasks);
  }

  getFilteredList() {
    switch (this.filterApplied) {
      default:
      case Filters.ALL_TASKS:
        return this.tasks;

      case Filters.COMPLETED:
        return this.tasks.filter(t => t.completed);

      case Filters.INCOMPLETE:
        return this.tasks.filter(t => !t.completed);
    }
  }

}

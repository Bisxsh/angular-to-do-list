import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ITask } from "../../../interfaces/ITask";
import {TaskService} from "../../../services/task.service";
import {filterTasks} from "../../util/TaskManager";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  filters!: IFilter[];
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
    this.service.filters.subscribe(f => this.filters = f);
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
    return filterTasks(this.tasks, this.filterApplied);
  }

}

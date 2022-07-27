import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { filters } from './util/Filters'
import { ITask } from "../../../interfaces/ITask";
import {TaskService} from "../../services/task.service";

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

  @Output('deleteTask') deleteEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
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
    this.tasks = this.tasks.map(t => {
      if (t.active) {
        return {
          ...t,
          active: false
        }
      }

      if (index == t.id) {
        this.activeTask = t;
        return {
          ...t,
          active: true
        }
      }

      return t;
    })
    this.service.changeTasks(this.tasks);
    this.service.changeActiveTask(this.activeTask);
  }



}

import { Component, OnInit } from '@angular/core';
import {BLANK_TASK, ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";
import {Filters} from "../../../side-bar/util/Filters";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private service: TaskService) { }

  tasks!:ITask[];
  filterApplied!:number;

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.filterApplied.subscribe(f => this.filterApplied = f);
  }

  saveTask(event:any) {
    if (!event) return;

    let value = event.target.value;
    let temp = this.tasks.map(t => {
      return {
        ...t,
        active: false,
        id: t.id+1
      }
    })

    let task = BLANK_TASK;
    task.title = value;

    temp.unshift(task);
    if (this.filterApplied!=Filters.ALL_TASKS) temp[0] = {...temp[0], date: new Date()}
    this.service.changeActiveTask(temp[0]);
    this.service.changeTasks(temp);
    event.target.value = '';
  }
}

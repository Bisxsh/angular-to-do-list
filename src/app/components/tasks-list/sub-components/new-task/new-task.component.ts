import { Component, OnInit } from '@angular/core';
import {BLANK_TASK, ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private service: TaskService) { }

  tasks!:ITask[];

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
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

    temp.unshift(task)
    this.service.changeActiveTask(temp[0]);
    this.service.changeTasks(temp);
    event.target.value = '';
  }
}

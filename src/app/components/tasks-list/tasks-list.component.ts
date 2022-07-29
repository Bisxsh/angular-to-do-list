import { Component, OnInit } from '@angular/core';
import {ITask} from "../../../interfaces/ITask";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor(private service: TaskService) { }

  tasks!:ITask[];
  activeTask!:ITask;

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
  }

}

import { Component, OnInit } from '@angular/core';
import {ITask} from "../../../interfaces/ITask";
import {TaskService} from "../../../services/task.service";
import {Filters} from "../side-bar/util/Filters";
import {filterTasks} from "../../util/TaskManager";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor(private service: TaskService) { }

  tasks!:ITask[];
  activeTask!:ITask;
  filterApplied!:number;

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
    this.service.filterApplied.subscribe(f => this.filterApplied = f);
  }

  getFilterTitle() {
    switch (this.filterApplied) {
      default:
      case (Filters.ALL_TASKS): return 'All Tasks';
      case (Filters.WEEK): return 'This Week\'s Tasks';
      case (Filters.TODAY): return 'Today\'s Tasks';
    }
  }

  areTasksInCategoryComplete() {
    return this.getFilteredList().filter(t => !t.completed).length == 0
  }

  getFilteredList() {
    return filterTasks(this.tasks, this.filterApplied);
  }

}

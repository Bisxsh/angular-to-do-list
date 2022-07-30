import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";
import {toggleCompleted} from "../../../../util/TaskManager";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService) { }

  @Input() task!: ITask;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  tasks!:ITask[];
  showDatePicker!:boolean;
  date: any;

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    // this.showDatePicker = this.task.date==undefined;
    this.showDatePicker = true;
    this.date = this.getFormattedDate();
  }

  getFormattedDate() {
    if (!this.task.date) return '';

    let taskD = this.task.date;
    let todayD = new Date();
    let taskDate = taskD.getDate();
    let todayDate = todayD.getDate();

    if (todayDate == taskDate) return 'Today';
    if (todayDate + 1 == taskDate) return 'Tomorrow';

    if (taskDate-todayDate < 7 && taskD.getMonth() == todayD.getMonth()) {
      return this.days[this.task.date.getDay()];
    }

    if (taskD.getFullYear() == todayD.getFullYear()) {
      return taskD.getDate() + ' ' + this.months[taskD.getMonth()]
    }
    return taskD.toLocaleDateString();
  }

  toggleTaskCompleted() {
    this.service.changeTasks(toggleCompleted(this.tasks, this.task));
  }

  updateDate(event: any) {
    this.service.changeTasks(this.tasks.map(t => {
      if (t.id == this.task.id) return {
        ...t,
        date: new Date(event.target.value)
      }
      return t;
    }))
  }

  cyclePriority() {
    this.service.changeTasks(this.tasks.map(t => {
      if (t.id == this.task.id) return {
        ...t,
        priority: (t.priority+1)%4
      }
      return t;
    }))
  }

}

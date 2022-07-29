import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: ITask;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedDate() {
    if (!this.task.date) return '';

    let taskD = this.task.date;
    let todayD = new Date();
    let taskDate = taskD.getDate();
    let todayDate = todayD.getDate();

    if (todayDate == taskDate) return 'Today';
    if (todayDate + 1 == taskDate) return 'Tomorrow';

    console.log(taskDate);
    console.log(todayDate);
    if (taskDate-todayDate < 7 && taskD.getMonth() == todayD.getMonth()) {
      return this.days[this.task.date.getDay()];
    }
    return taskD.toLocaleDateString();

  }

}

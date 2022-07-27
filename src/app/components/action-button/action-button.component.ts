import { Component } from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {BLANK_TASK, ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {

  constructor(private service: TaskService) { }

  showMenu: boolean = false;
  showPrompt: boolean = false;
  showInfo: boolean = false;
  tasks!:ITask[];

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
  }

  addNote() {
    let temp = this.tasks.map(t => {
      if (t.active) return {
        ...t,
        active: false
      }
      return {
        ...t,
        id: t.id+1
      }
    })
    temp.unshift(BLANK_TASK)
    this.service.changeActiveTask(temp[0]);
    this.service.changeTasks(temp);
    this.toggleMenu();
  }

  toggleDeletePrompt() {
    this.showPrompt = !this.showPrompt;
  }

  deleteAllNotes() {
    this.service.changeTasks([]);
    this.toggleDeletePrompt();
    this.toggleMenu();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}

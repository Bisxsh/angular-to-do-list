import { Component } from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {

  constructor(private service: TaskService) { }

  showMenu: boolean = false;
  showPrompt: boolean = false;
  showAllNotesPrompt: boolean = false;
  showCompletedNotesPrompt: boolean = false;
  showInfo: boolean = false;
  tasks!:ITask[];

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
  }

  removeCompleted() {
    this.service.changeTasks(this.tasks.filter(t => !t.completed));
  }

  toggleDeletePrompt() {
    this.showAllNotesPrompt = !this.showAllNotesPrompt;
  }

  dismissDeletePrompt(event:any) {
    console.log(event);
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

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

  toggleDeletePrompt() {
    this.showAllNotesPrompt = !this.showAllNotesPrompt;
  }

  toggleCompletedPrompt() {
    this.showCompletedNotesPrompt = !this.showCompletedNotesPrompt;
  }

  dismissPrompt(event:any) {
    if (event) {
      this.toggleDeletePrompt();
    } else {
      this.toggleCompletedPrompt();
    }
    this.toggleMenu();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}

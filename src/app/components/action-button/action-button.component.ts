import { Component } from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {

  showMenu: boolean = false;

  constructor(private service: TaskService) { }

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
    temp.unshift({

      id: 0,
      title: "Untitled Note",
      userId: 1,
      completed: false,

      category: "",
      active: true,
      description: "# Type your markdown notes here"
    })
    this.service.changeActiveTask(temp[0]);
    this.service.changeTasks(temp);
    this.toggleMenu();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}

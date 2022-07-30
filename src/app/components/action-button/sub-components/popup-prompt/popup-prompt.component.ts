import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";

@Component({
  selector: 'app-popup-prompt',
  templateUrl: './popup-prompt.component.html',
  styleUrls: ['./popup-prompt.component.css']
})
export class PopupPromptComponent implements OnInit {

  constructor(private service: TaskService) { }

  tasks!:ITask[];

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
  }

  @Input() showPopup:boolean = false;
  @Input() allNotes!:boolean;
  @Input() question!:string;
  @Output('promptDismissed') emitter: EventEmitter<any> = new EventEmitter<any>();

  promptConfirmed() {
    if (this.allNotes) {
      this.deleteAllNotes();
    } else {
      this.deleteCompletedNotes();
    }
    this.dismissPrompt();
    console.log("HERE");
  }

  deleteAllNotes() {
    this.service.changeTasks([]);
  }

  deleteCompletedNotes() {
    this.service.changeTasks(this.tasks.filter(t => !t.completed));
  }

  dismissPrompt() {
    this.emitter.emit(this.allNotes);
  }

}

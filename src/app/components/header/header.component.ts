import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from "../../../interfaces/ITask";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: TaskService) { }

  @Input() title!: string;
  @Input() editorWriteMode!:boolean;
  @Output('taskTitleChange') taskEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('editorModeChange') editorEmitter: EventEmitter<any> = new EventEmitter<any>();

  tasks!:ITask[];
  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
  }

  titleChangeHandler(title: any) {
    console.log(title);
  }

  onTitleChange(event: any) {
    this.taskEmitter.emit(event.target.value)
  }

  onModeChange() {
    if (this.tasks.length) this.editorEmitter.emit(!this.editorWriteMode);
  }
}

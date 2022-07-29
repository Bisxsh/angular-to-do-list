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
  @Input() showToolbar!:boolean;
  @Output('taskTitleChange') taskEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('editorModeChange') editorEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('toolbarToggled') toolbarEmitter: EventEmitter<any> = new EventEmitter<any>();

  tasks!:ITask[];
  activeTask!:ITask;

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
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

  onToolbarChange() {
    this.toolbarEmitter.emit();
  }

  toggleCompleted() {
    if (!this.activeTask) {
      this.service.changeActiveTask(this.tasks[0]);
    }

    this.service.changeTasks(this.tasks.map(t => {
      if (t.id == this.activeTask.id) return {
        ...t,
        completed: !this.activeTask.completed
      }
      return t;
    }))

    let task = this.activeTask;
    task.completed = !task.completed;
    this.service.changeActiveTask(task);

  }
}

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";

@Component({
  selector: 'app-side-menu-task',
  templateUrl: './side-menu-task.component.html',
  styleUrls: ['./side-menu-task.component.css']
})
export class SideMenuTaskComponent implements OnChanges{

  @Input() active!: boolean;
  @Input() label!: string;
  @Input() id!: number;
  @Input() completed!: boolean;

  tasks!:ITask[];
  activeTask!:ITask;
  iconName:string = this.getIconName();

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
  }

  getIconName() {
    if (this.completed) {
      return "completed_task"+((this.active) ? "s_" : "_in")+"active.png";
    }
    return "task_icon_"+((this.active) ? "" : "in")+"active.png";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.iconName = this.getIconName();
  }

  @Output('taskClicked') taskEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('deleteClicked') deleteEmitter: EventEmitter<any> = new EventEmitter<any>();

  taskClickHandler() {
    this.taskEmitter.emit(this.id);
  }

  deleteTask() {
    this.service.deleteTask(this.id-1, this.tasks);
  }
}

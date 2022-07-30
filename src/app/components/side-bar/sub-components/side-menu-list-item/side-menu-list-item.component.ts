import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";
import {SideMenuListOption} from "../../util/SideMenuListOption";

@Component({
  selector: 'app-side-menu-list-item',
  templateUrl: './side-menu-list-item.component.html',
  styleUrls: []
})
export class SideMenuListItemComponent implements OnInit {

  @Input() item!:SideMenuListOption;

  tasks!:ITask[];
  activeTask!:ITask;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
  }

  getIconName() {
    if (this.item.active) return this.item.iconActive;
    return this.item.iconInactive;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.iconName = this.getIconName();
  // }

  @Output('itemClicked') itemEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('optionsClicked') deleteEmitter: EventEmitter<any> = new EventEmitter<any>();

  taskClickHandler() {
    this.itemEmitter.emit(this.item.id);
  }

  deleteTask() {
    this.service.deleteTask(this.item.id-1, this.tasks);
  }
}

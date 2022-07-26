import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-side-menu-task',
  templateUrl: './side-menu-task.component.html',
  styleUrls: ['./side-menu-task.component.css']
})
export class SideMenuTaskComponent implements OnChanges{
  @Input() active!: boolean;

  iconName:string = this.getIconName();

  getIconName() {
    return "task_icon_"+((this.active) ? "" : "in")+"active.png";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.iconName = this.getIconName();
  }
}

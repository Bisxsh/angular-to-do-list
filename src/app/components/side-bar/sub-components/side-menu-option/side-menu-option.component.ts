import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-side-menu-option',
  templateUrl: './side-menu-option.component.html',
  styleUrls: ['./side-menu-option.component.css']
})
export class SideMenuOptionComponent {
  @Input() backgroundColourClass!: string;
  @Input() backgroundActive!: boolean;
  @Input() label!: string;
  @Input() showDeleteIcon!: boolean;

  iconShown = this.showDeleteIcon || false;

  @Input()
  get iconName(): string { return this.iconPath; }
  set iconName(path: string) {
    this.iconPath = (path && 'assets/images/'+path) || 'assets/images/task_icon.png';
  }

  iconPath = '';

  @Output('deleteTask') eventEmitter: EventEmitter<any> = new EventEmitter();

  deleteTask() {
    this.eventEmitter.emit();
  }

  showIcon() {
    if (this.showDeleteIcon) this.iconShown = true;
  }

  hideIcon() {
    if (this.showDeleteIcon) this.iconShown = false;
  }
}

import {Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu-option',
  templateUrl: './side-menu-option.component.html',
  styleUrls: ['./side-menu-option.component.css']
})
export class SideMenuOptionComponent {
  @Input() backgroundColourClass!: string;
  @Input() label!: string;

  @Input()
  get iconName(): string { return this.iconPath; }
  set iconName(path: string) {
    this.iconPath = (path && '/assets/images/'+path) || '/assets/images/task_icon.png';
  }

  iconPath = '';
  showDeleteIcon = (this.iconPath === '/assets/images/task_icon.png');
}

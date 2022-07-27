import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() editorWriteMode!:boolean;
  @Output('taskTitleChange') taskEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('editorModeChange') editorEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  titleChangeHandler(title: any) {
    console.log(title);
  }

  onTitleChange(event: any) {
    this.taskEmitter.emit(event.target.value)
  }

  onModeChange() {
    this.editorEmitter.emit(!this.editorWriteMode);
  }
}

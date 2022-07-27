import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges {

  write: boolean = true;
  @Input() activeTask!: ITask;
  taskContent: String = (this.activeTask) ? this.activeTask.description : "";
  @Output('taskContentChange') eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.taskContent);

    for (let propName in changes) {
      let change = changes[propName];
      this.taskContent = change.currentValue.description;
    }
  }

  onChange(event: any) {
    this.eventEmitter.emit(event.target.value);
  }


}

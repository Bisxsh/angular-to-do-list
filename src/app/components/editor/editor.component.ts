import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ITask} from "../../../interfaces/ITask";
import * as Showdown from "showdown";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges {

  @Input() activeTask!: ITask;
  @Input() write!: boolean;
  @Output('taskContentChange') eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  taskContent: string = (this.activeTask) ? this.activeTask.description : "";
  contentTags!: string;

  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.taskContent)
    for (let propName in changes) {
      let change = changes[propName];
      console.log(change)
      if (typeof change.currentValue != "boolean") {
        this.taskContent = change.currentValue.description;
        Promise.resolve(this.converter.makeHtml(this.taskContent))
          .then(d => this.contentTags = d);
      }
    }
    console.log(this.taskContent)
  }

  onChange(event: any) {
    this.eventEmitter.emit(event.target.value);
    Promise.resolve(this.converter.makeHtml(event.target.value))
      .then(d => this.contentTags = d);
  }


}

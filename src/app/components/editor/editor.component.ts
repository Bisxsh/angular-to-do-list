import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ITask} from "../../../interfaces/ITask";
import * as Showdown from "showdown";
import {TaskService} from "../../../services/task.service";
import {EditorButtonMappings, LIST_BUTTONS, OTHER_BUTTONS, TEXT_BUTTONS} from "./util/Images";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges, OnInit {

  constructor(private service: TaskService, private elementRef: ElementRef) { }

  @Input() activeTask!: ITask;
  @Input() write!: boolean;
  @Output('taskContentChange') eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  taskContent: string = (this.activeTask) ? this.activeTask.description : "";
  contentTags!: string;
  textArea!: any;

  textButtons = TEXT_BUTTONS;
  listButtons = LIST_BUTTONS;
  otherButtons = OTHER_BUTTONS;

  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    taskLists: true,
  })

  tasks!:ITask[];
  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.getDOMElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      if (typeof change.currentValue != "boolean") {
        this.taskContent = change.currentValue.description;
        Promise.resolve(this.converter.makeHtml(this.taskContent))
          .then(d => this.contentTags = d);
      }
    }
  }

  getDOMElement() {
    this.textArea = (<HTMLElement>this.elementRef.nativeElement).querySelector('.editor--write-input');
  }

  onChange(event: any) {
    this.eventEmitter.emit(event.target.value);
    Promise.resolve(this.converter.makeHtml(event.target.value))
      .then(d => this.contentTags = d);
  }

  toggleWrite() {
    this.write = !this.write;
  }

  insertMarkdown(button: number) {
    console.log(this.textArea);
    let start = this.textArea.selectionStart;
    // let end = this.textArea.selectionEnd;
    let text = this.textArea.value;
    switch (button) {
      case EditorButtonMappings.HEADING:
        this.textArea.value = text.substring(0, Math.max(start-4, 0)) + text.substring(Math.max(start-4, 0))
        return;
    }
  }

}

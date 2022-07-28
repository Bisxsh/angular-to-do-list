import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
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
export class EditorComponent implements OnChanges, OnInit, AfterViewInit {

  constructor(private service: TaskService) { }

  @Input() activeTask!: ITask;
  @Input() write!: boolean;
  @Output('taskContentChange') eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editorInput') editorInput!: ElementRef;

  taskContent: string = (this.activeTask) ? this.activeTask.description : "";
  contentTags!: string;

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

  ngAfterViewInit() {
    console.log(this.editorInput.nativeElement.value);
  }

  onChange(event: any) {
    this.eventEmitter.emit(event.target.value);
    this.updateMarkdown(event.target.value)
  }

  updateMarkdown(test: string) {
    Promise.resolve(this.converter.makeHtml(test))
      .then(d => this.contentTags = d);
  }


  toggleWrite() {
    this.write = !this.write;
  }

  surroundWithString(cursorStart: number, cursorEnd: number, text:string, string: string) {
    if (cursorStart != cursorEnd) {
      //Section highlighted
      return text.substring(0, cursorStart) + string +
        text.substring(cursorStart, cursorEnd) + string +
        text.substring(cursorEnd);
    }

    //Gets the start and end position of the word the cursor is in (if present)
    let lastWordIndexStart = Math.max(text.substring(0, cursorStart).lastIndexOf(' ')+1, 0)
    let lastWordIndexEnd = Math.max(text.substring(cursorStart).indexOf(' ')+text.indexOf(text.substring(cursorStart)), 0) || text.length

    return text.substring(0, lastWordIndexStart) + string +
      text.substring(lastWordIndexStart, lastWordIndexEnd) + string +
      text.substring(lastWordIndexEnd);
  }

  insertMarkdown(button: number) {
    console.log("*************");
    if (!this.write) return;

    let textArea = this.editorInput.nativeElement;
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let text = textArea.value;



    switch (button) {
      case EditorButtonMappings.HEADING:
        this.taskContent = '#' + text;
        break;

      case EditorButtonMappings.ITALIC:
        this.taskContent = this.surroundWithString(start, end, text, '*');
        break;

      case EditorButtonMappings.STRIKETHROUGH:
        this.taskContent = this.surroundWithString(start, end, text, '~~');
        break;
    }
    this.updateMarkdown(this.taskContent);
  }



}

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
      let highlightedSub = text.substring(cursorStart, cursorEnd);
      let endSub = text.substring(cursorEnd);

      if (highlightedSub.charAt(highlightedSub.length-1) == ' ') {
        //Double-clicking a word can highlight the space that occurs after, ignore this when wrapping
        highlightedSub = highlightedSub.substring(0, highlightedSub.length-1);
        endSub = ' ' + endSub;
      }
      highlightedSub = (highlightedSub.charAt(highlightedSub.length-1) == ' ') ?
        highlightedSub.substring(0, highlightedSub.length-2) :
        highlightedSub;

      //Section highlighted
      return text.substring(0, cursorStart) + string + highlightedSub + string + endSub;
    }

    //Gets the start and end position of the word the cursor is in (if present)
    let lastWordIndexStart = Math.max(text.substring(0, cursorStart).lastIndexOf(' ')+1, 0)
    let lastWordIndexEnd = Math.max(text.substring(cursorStart).indexOf(' ')+text.indexOf(text.substring(cursorStart)), 0) || text.length

    return text.substring(0, lastWordIndexStart) + string +
      text.substring(lastWordIndexStart, lastWordIndexEnd) + string +
      text.substring(lastWordIndexEnd);
  }

  insertAtStartOfLine(cursorStart: number, cursorEnd: number, text:string, string: string) {
    let startOfLine = text.substring(0, cursorStart).lastIndexOf('\n')+1;
    if (cursorStart == cursorEnd) {
      return text.substring(0, startOfLine) + string +
        text.substring(startOfLine);
    }

    //Highlighted section, append to start of every line included
    let section = text.substring(startOfLine-1, cursorEnd);
    section = section.replace(/\n/g, '\n'+string)
    return text.substring(0, startOfLine-1) + section + text.substring(cursorEnd);
  }

  insertNumberedPoints(cursorStart: number, cursorEnd: number, text:string) {
    if (cursorStart == cursorEnd) {
      return this.insertAtStartOfLine(cursorStart, cursorEnd, text, ' 1. ');
    }

    let startOfLine = text.substring(0, cursorStart).lastIndexOf('\n');
    let array = text.substring(startOfLine, cursorEnd).split('\n');
    let index:number = 0;
    console.log(array);
    array = array.filter(t => t!='')
      .map(t => {
        index++;
        return '\n'+index+'. ' + t;
      })
    console.log(array);
    return text.substring(0, startOfLine) + array.join('') + text.substring(cursorEnd);
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
        this.taskContent = this.insertAtStartOfLine(start, end, text, '# ')
        break;

      case EditorButtonMappings.ITALIC:
        this.taskContent = this.surroundWithString(start, end, text, '*');
        break;

      case EditorButtonMappings.STRIKETHROUGH:
        this.taskContent = this.surroundWithString(start, end, text, '~~');
        break;

      case EditorButtonMappings.BOLD:
        this.taskContent = this.surroundWithString(start, end, text, '**');
        break;


      case EditorButtonMappings.BULLET_LIST:
        this.taskContent = this.insertAtStartOfLine(start, end, text, '- ')
        break;

      case EditorButtonMappings.NUMBER_LIST:
        this.taskContent = this.insertNumberedPoints(start, end, text);

    }
    this.updateMarkdown(this.taskContent);
  }



}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Output('taskTitleChange') eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  titleChangeHandler(title: any) {
    console.log(title);
  }

  onChange(event: any) {
    this.eventEmitter.emit(event.target.value)
  }

}

import {Component, OnInit} from '@angular/core';
import { ITask } from "../interfaces/ITask";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-list';

  tasks!: ITask[];
  activeTaskIndex: number = 1;
  activeTask!: ITask;
  editorWriteMode:boolean = true;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //Load dummy data
    this.tasks = []
    this.http.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
      .subscribe((task: ITask[]) => {
        let t: ITask;
        let obj;
        let iterator;

        iterator = task.entries();

        for (let i = 0; i < 20; i++) {
          obj = iterator.next().value[1];
          t = {
            id: obj.id,
            title: obj.title,
            userId: obj.userId,
            completed: obj.completed,

            category: obj.category || "",
            active: (obj.id === 1),
            description: "# Type your markdown notes here"
          }
          this.tasks.push(t);

          if (i === 0) this.activeTask = t;
        }
      });
  }

  activeTaskChanged(data: any) {
    this.activeTaskIndex = data;
    this.tasks = this.tasks.map(t => {
      if (t.active) {
        return {
          ...t,
          active: false
        }
      }

      if (this.activeTaskIndex == t.id) {
        this.activeTask = t;
        return {
          ...t,
          active: true
        }
      }

      return t;
    })
  }

  activeTaskTitleChanged(data: any) {
    this.tasks = this.tasks.map(t => {
      if (t.id == this.activeTaskIndex) {
        return {
          ...t,
          title: data
        }
      }
      return t;
    })
  }

  activeTaskContentChange(data: any) {
    this.tasks = this.tasks.map(t => {
      if (t.id == this.activeTaskIndex) {
        return {
          ...t,
          description: data
        }
      }
      return t;
    })
  }

  editorWriteModeChange() {
    this.editorWriteMode = !this.editorWriteMode;
  }

  deleteTask(data: number) {
    console.log(this.tasks);
    this.tasks.splice(data-1, 1);
    this.tasks = this.tasks.map(t => {
      return {
        ...t,
        id: this.tasks.indexOf(t)+1
      }
    })
  }

}

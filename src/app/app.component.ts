import {Component, OnInit} from '@angular/core';
import { ITask } from "../interfaces/ITask";
import {HttpClient} from "@angular/common/http";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-list';

  tasks!: ITask[];
  activeTask!: ITask;
  editorWriteMode:boolean = true;
  showToolbar: boolean = true;
  showEditor!: boolean;

  constructor(private http: HttpClient, private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
    this.service.activeTask.subscribe(t => this.activeTask = t);
    this.service.showEditor.subscribe(e => this.showEditor = e);

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
            description: "# Type your markdown notes here",
            date: this.getRandomDate(),
            priority: (Math.floor(Math.random() * 4))
          }
          this.tasks.push(t);

          if (i === 0) this.activeTask = t;
        }
      });
    this.service.changeTasks(this.tasks);
    this.service.changeActiveTask(this.activeTask);
  }

  activeTaskTitleChanged(data: any) {
    let temp = this.tasks.map(t => {
      if (t.id == this.activeTask.id) {
        return {
          ...t,
          title: data
        }
      }
      return t;
    })
    this.service.changeTasks(temp);
  }

  activeTaskContentChange(data: any) {
    let temp = this.tasks.map(t => {
      if (t.id == this.activeTask.id) {
        return {
          ...t,
          description: data
        }
      }
      return t;
    })
    this.service.changeTasks(temp);
  }

  editorWriteModeChange() {
    this.editorWriteMode = !this.editorWriteMode;
  }

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
  }

  getRandomDate() {
    let date1 = new Date();
    let date2 = new Date(2023, 6, 1);
    return new Date(date1.getTime() + Math.random() * (date2.getTime() - date1.getTime()));

  }

}

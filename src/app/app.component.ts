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
            active: (obj.id === 1)
          }
          this.tasks.push(t);
        }
      });
  }



}

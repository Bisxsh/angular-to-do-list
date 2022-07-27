import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ITask} from "../interfaces/ITask";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private _tasksSource = new BehaviorSubject<ITask[]>([]);
  private _activeTask!: ITask;
  private _activeTaskSource = new BehaviorSubject<ITask>(this._activeTask);
  private _filteredTasksSource = new BehaviorSubject<ITask[]>([]);
  private _filterAppliedSource = new BehaviorSubject<number>(0);

  filteredTasks = this._filteredTasksSource.asObservable();
  tasks = this._tasksSource.asObservable();
  activeTask = this._activeTaskSource.asObservable();
  filterApplied = this._filterAppliedSource.asObservable();

  changeTasks(tasks: ITask[]) {
    this._tasksSource.next(tasks);
  }

  changeActiveTask(task: ITask) {
    this._activeTaskSource.next(task);
  }

  changeFilteredTasks(tasks: ITask[]) {
    this._filteredTasksSource.next(tasks);
  }

  changeFilterApplied(filter: number) {
    this._filterAppliedSource.next(filter);
  }

  deleteTask(index: number, tasks:ITask[]) {
    tasks.splice(index, 1);
    this.changeTasks(tasks.map(t => {
      if (index+2 === t.id) {
        this.changeActiveTask(t);
      }

      return {
        ...t,
        id: tasks.indexOf(t)+1,
        active: (index+2 === t.id)
      }
    }))
  }

}

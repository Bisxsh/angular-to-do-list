import {ITask} from "../../interfaces/ITask";
import {Filters} from "../components/side-bar/util/Filters";
import * as dayjs from "dayjs";

  export function toggleCompleted(tasks:ITask[], task:ITask) {
    return tasks.map(t => {
      if (t.id == task.id) return {
        ...t,
        completed: !t.completed
      }

      return t;
    })
  }

  export function filterTasks(tasks:ITask[], filterApplied:number) {
    switch (filterApplied) {
      default:
      case Filters.ALL_TASKS:
        return tasks;

      case Filters.TODAY:
        return tasks.filter(t => (t.date && sameDay(t.date)) || false);

      case Filters.WEEK:
        return tasks.filter(t => (t.date && dayjs(t.date).isSame(dayjs(), 'w')) || false);
    }
  }

  function sameDay(date:Date) {
    let today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  }



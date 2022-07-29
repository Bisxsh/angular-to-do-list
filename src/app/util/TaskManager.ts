import {ITask} from "../../interfaces/ITask";

  export function toggleCompleted(tasks:ITask[], task:ITask) {
    return tasks.map(t => {
      if (t.id == task.id) return {
        ...t,
        completed: !t.completed
      }

      return t;
    })
  }



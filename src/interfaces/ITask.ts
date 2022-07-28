export interface ITask {
  id: number,
  title: string,
  userId: number,
  completed: boolean,

  category: string,
  active: boolean
  description: string
}

export const BLANK_TASK = {
  id: 0,
  title: "Untitled Task",
  userId: 1,
  completed: false,

  category: "",
  active: true,
  description: "# Type your markdown notes here"
}

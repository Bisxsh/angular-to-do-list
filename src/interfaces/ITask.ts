export interface ITask {
  id: number,
  title: string,
  userId: number,
  completed: boolean,

  category: string,
  active: boolean
  description: string
}

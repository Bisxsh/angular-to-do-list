export let filters: IFilter[] = [
  {
    id: 0,
    label: 'All Tasks',
    activeIcon: 'all_tasks_active.png',
    inactiveIcon: 'all_tasks_inactive.png',
    active: true,
  },

  // {
  //   label: 'Collections',
  //   activeIcon: 'collections_active.png',
  //   inactiveIcon: 'collections_inactive.png',
  //   active: false
  // },

  {
    id: 1,
    label: 'Completed',
    activeIcon: 'completed_tasks_active.png',
    inactiveIcon: 'completed_tasks_inactive.png',
    active: false
  },

  {
    id: 2,
    label: 'Incomplete',
    activeIcon: 'incomplete_tasks_active.png',
    inactiveIcon: 'incomplete_tasks_inactive.png',
    active: false
  },

];

export enum Filters {
  ALL_TASKS,
  COMPLETED,
  INCOMPLETE
}

export let filters: IFilter[] = [
  {
    id: 0,
    label: 'All Tasks',
    activeIcon: 'sidebar/all_tasks_active.png',
    inactiveIcon: 'sidebar/all_tasks_inactive.png',
    active: true,
  },

  // {
  //   id: 1,
  //   label: 'Collections',
  //   activeIcon: 'sidebar/collections_active.png',
  //   inactiveIcon: 'sidebar/collections_inactive.png',
  //   active: false
  // },

  {
    id: 2,
    label: 'Today',
    activeIcon: 'sidebar/today_active.png',
    inactiveIcon: 'sidebar/today_inactive.png',
    active: false
  },

  {
    id: 3,
    label: 'This Week',
    activeIcon: 'sidebar/week_active.png',
    inactiveIcon: 'sidebar/week_inactive.png',
    active: false
  },

];

export enum Filters {
  ALL_TASKS,
  COLLECTIONS,
  TODAY,
  WEEK
}

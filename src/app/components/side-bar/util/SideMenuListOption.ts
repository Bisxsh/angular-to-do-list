export class SideMenuListOption {
  label: string = '';
  iconActive: string = '';
  iconInactive: string = '';
  id: number = 0;
  collections: boolean = false;

  public create(label:string, id:number, collection:boolean): SideMenuListOption {
    this.label = label;
    this.id = id;
    this.iconActive = (collection) ? 'collections_active.png' : 'task_icon_active.png';
    this.iconInactive = (collection) ? 'collections_inactive.png' : 'task_icon_inactive.png';
    return this;
  }
}

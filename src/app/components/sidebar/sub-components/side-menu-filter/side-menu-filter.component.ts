import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-side-menu-filter',
  templateUrl: './side-menu-filter.component.html',
  styleUrls: ['./side-menu-filter.component.css']
})
export class SideMenuFilterComponent implements OnChanges {

  @Input() label: string = "";
  @Input() iconName: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}

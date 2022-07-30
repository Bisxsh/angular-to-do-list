import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuListItemComponent } from './side-menu-list-item.component';

describe('SideMenuListItemComponent', () => {
  let component: SideMenuListItemComponent;
  let fixture: ComponentFixture<SideMenuListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

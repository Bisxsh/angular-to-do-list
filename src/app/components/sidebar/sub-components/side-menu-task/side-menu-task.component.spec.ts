import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTaskComponent } from './side-menu-task.component';

describe('SideMenuTaskComponent', () => {
  let component: SideMenuTaskComponent;
  let fixture: ComponentFixture<SideMenuTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuOptionComponent } from './side-menu-option.component';

describe('SideMenuOptionComponent', () => {
  let component: SideMenuOptionComponent;
  let fixture: ComponentFixture<SideMenuOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

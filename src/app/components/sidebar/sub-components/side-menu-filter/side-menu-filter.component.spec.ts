import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuFilterComponent } from './side-menu-filter.component';

describe('SideMenuFilterComponent', () => {
  let component: SideMenuFilterComponent;
  let fixture: ComponentFixture<SideMenuFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

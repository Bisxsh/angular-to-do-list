import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompletedComponent } from './delete-completed.component';

describe('DeleteCompletedComponent', () => {
  let component: DeleteCompletedComponent;
  let fixture: ComponentFixture<DeleteCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPromptComponent } from './popup-prompt.component';

describe('PopupPromptComponent', () => {
  let component: PopupPromptComponent;
  let fixture: ComponentFixture<PopupPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

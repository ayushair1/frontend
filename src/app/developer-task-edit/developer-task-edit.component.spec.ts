import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTaskEditComponent } from './developer-task-edit.component';

describe('DeveloperTaskEditComponent', () => {
  let component: DeveloperTaskEditComponent;
  let fixture: ComponentFixture<DeveloperTaskEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperTaskEditComponent]
    });
    fixture = TestBed.createComponent(DeveloperTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

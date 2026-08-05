import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemSkeleton } from './task-item-skeleton';

describe('TaskItemSkeleton', () => {
  let component: TaskItemSkeleton;
  let fixture: ComponentFixture<TaskItemSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

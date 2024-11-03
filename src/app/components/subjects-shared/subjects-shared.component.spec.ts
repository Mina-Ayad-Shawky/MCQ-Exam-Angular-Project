import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsSharedComponent } from './subjects-shared.component';

describe('SubjectsSharedComponent', () => {
  let component: SubjectsSharedComponent;
  let fixture: ComponentFixture<SubjectsSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

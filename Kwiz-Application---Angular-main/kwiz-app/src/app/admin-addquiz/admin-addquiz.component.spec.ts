import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddquizComponent } from './admin-addquiz.component';

describe('AdminAddquizComponent', () => {
  let component: AdminAddquizComponent;
  let fixture: ComponentFixture<AdminAddquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddquizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

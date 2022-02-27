import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesRowComponent } from './votes-row.component';

describe('VotesRowComponent', () => {
  let component: VotesRowComponent;
  let fixture: ComponentFixture<VotesRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotesRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

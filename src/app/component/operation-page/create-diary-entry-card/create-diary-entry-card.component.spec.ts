import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiaryEntryCardComponent } from './create-diary-entry-card.component';

describe('CreateDiaryEntryCardComponent', () => {
  let component: CreateDiaryEntryCardComponent;
  let fixture: ComponentFixture<CreateDiaryEntryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDiaryEntryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiaryEntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquisicionFormComponent } from './adquisicion-form.component';

describe('AdquisicionFormComponent', () => {
  let component: AdquisicionFormComponent;
  let fixture: ComponentFixture<AdquisicionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdquisicionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdquisicionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

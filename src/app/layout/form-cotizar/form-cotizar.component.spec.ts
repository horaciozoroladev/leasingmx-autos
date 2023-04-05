import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCotizarComponent } from './form-cotizar.component';

describe('FormCotizarComponent', () => {
  let component: FormCotizarComponent;
  let fixture: ComponentFixture<FormCotizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCotizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

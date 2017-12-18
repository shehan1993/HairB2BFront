import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalenComponent } from './calen.component';


describe('CalenComponent', () => {
  let component: CalenComponent;
  let fixture: ComponentFixture<CalenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

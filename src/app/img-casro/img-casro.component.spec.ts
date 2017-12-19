import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCasroComponent } from './img-casro.component';

describe('ImgCasroComponent', () => {
  let component: ImgCasroComponent;
  let fixture: ComponentFixture<ImgCasroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCasroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCasroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

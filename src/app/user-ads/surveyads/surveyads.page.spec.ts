import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyadsPage } from './surveyads.page';

describe('SurveyadsPage', () => {
  let component: SurveyadsPage;
  let fixture: ComponentFixture<SurveyadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyadsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

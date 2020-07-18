import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyadDetailPage } from './surveyad-detail.page';

describe('SurveyadDetailPage', () => {
  let component: SurveyadDetailPage;
  let fixture: ComponentFixture<SurveyadDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyadDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyadDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

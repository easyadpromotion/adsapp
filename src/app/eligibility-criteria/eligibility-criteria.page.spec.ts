import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EligibilityCriteriaPage } from './eligibility-criteria.page';

describe('EligibilityCriteriaPage', () => {
  let component: EligibilityCriteriaPage;
  let fixture: ComponentFixture<EligibilityCriteriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityCriteriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EligibilityCriteriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

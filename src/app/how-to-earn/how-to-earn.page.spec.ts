import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HowToEarnPage } from './how-to-earn.page';

describe('HowToEarnPage', () => {
  let component: HowToEarnPage;
  let fixture: ComponentFixture<HowToEarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToEarnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToEarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

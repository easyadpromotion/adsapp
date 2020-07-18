import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoadDetailPage } from './videoad-detail.page';

describe('VideoadDetailPage', () => {
  let component: VideoadDetailPage;
  let fixture: ComponentFixture<VideoadDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoadDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoadDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

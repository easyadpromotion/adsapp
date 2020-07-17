import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyADsPage } from './my-ads.page';

describe('MyADsPage', () => {
  let component: MyADsPage;
  let fixture: ComponentFixture<MyADsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyADsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyADsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

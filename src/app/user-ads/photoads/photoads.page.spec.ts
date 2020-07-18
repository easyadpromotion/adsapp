import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoadsPage } from './photoads.page';

describe('PhotoadsPage', () => {
  let component: PhotoadsPage;
  let fixture: ComponentFixture<PhotoadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoadsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

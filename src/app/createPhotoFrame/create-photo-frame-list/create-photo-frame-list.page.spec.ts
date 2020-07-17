import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameListPage } from './create-photo-frame-list.page';

describe('CreatePhotoFrameListPage', () => {
  let component: CreatePhotoFrameListPage;
  let fixture: ComponentFixture<CreatePhotoFrameListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhotoFrameListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePhotoFrameListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

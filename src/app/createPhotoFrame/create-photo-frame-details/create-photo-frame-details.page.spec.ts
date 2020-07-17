import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameDetailsPage } from './create-photo-frame-details.page';

describe('CreatePhotoFrameDetailsPage', () => {
  let component: CreatePhotoFrameDetailsPage;
  let fixture: ComponentFixture<CreatePhotoFrameDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhotoFrameDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePhotoFrameDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameAddPage } from './create-photo-frame-add.page';

describe('CreatePhotoFrameAddPage', () => {
  let component: CreatePhotoFrameAddPage;
  let fixture: ComponentFixture<CreatePhotoFrameAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhotoFrameAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePhotoFrameAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

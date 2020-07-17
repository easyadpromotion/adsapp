import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameEditPage } from './create-photo-frame-edit.page';

describe('CreatePhotoFrameEditPage', () => {
  let component: CreatePhotoFrameEditPage;
  let fixture: ComponentFixture<CreatePhotoFrameEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhotoFrameEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePhotoFrameEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

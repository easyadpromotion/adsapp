import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoadsPage } from './videoads.page';

describe('VideoadsPage', () => {
  let component: VideoadsPage;
  let fixture: ComponentFixture<VideoadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoadsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

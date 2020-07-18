import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoadDetailPage } from './photoad-detail.page';

describe('PhotoadDetailPage', () => {
  let component: PhotoadDetailPage;
  let fixture: ComponentFixture<PhotoadDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoadDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoadDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

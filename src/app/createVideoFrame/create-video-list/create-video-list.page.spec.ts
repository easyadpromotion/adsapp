import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateVideoListPage } from './create-video-list.page';

describe('CreateVideoListPage', () => {
  let component: CreateVideoListPage;
  let fixture: ComponentFixture<CreateVideoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVideoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVideoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

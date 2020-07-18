import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateVideoEditPage } from './create-video-edit.page';

describe('CreateVideoEditPage', () => {
  let component: CreateVideoEditPage;
  let fixture: ComponentFixture<CreateVideoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVideoEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVideoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

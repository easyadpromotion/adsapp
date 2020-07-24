import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketManagementAddPage } from './ticket-management-add.page';

describe('TicketManagementAddPage', () => {
  let component: TicketManagementAddPage;
  let fixture: ComponentFixture<TicketManagementAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketManagementAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketManagementAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

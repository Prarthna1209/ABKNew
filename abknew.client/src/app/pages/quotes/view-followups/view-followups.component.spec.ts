import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFollowupsComponent } from './view-followups.component';

describe('ViewFollowupsComponent', () => {
  let component: ViewFollowupsComponent;
  let fixture: ComponentFixture<ViewFollowupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFollowupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

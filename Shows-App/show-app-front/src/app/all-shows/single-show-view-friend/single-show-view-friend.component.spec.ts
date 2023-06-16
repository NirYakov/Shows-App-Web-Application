/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SingleShowViewFriendComponent } from './single-show-view-friend.component';

describe('SingleShowViewFriendComponent', () => {
  let component: SingleShowViewFriendComponent;
  let fixture: ComponentFixture<SingleShowViewFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShowViewFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShowViewFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

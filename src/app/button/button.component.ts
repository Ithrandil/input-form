import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { StepperStore } from '../stepper.store';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy{
  @Select(StepperStore.getDisableValue) isButtonDisabled$: Observable<boolean>;
  @Input() label: string;
  @Input() forceEnable = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (!this.forceEnable) {
      this.subscription.add(this.isButtonDisabled$.subscribe());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

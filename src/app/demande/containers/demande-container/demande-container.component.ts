import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StepperStore } from 'src/app/demande/stores/stepper.store';

import { DemandeStore } from '../../stores/demande.store';

@Component({
  selector: 'app-demande-container',
  templateUrl: './demande-container.component.html',
  styleUrls: ['./demande-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandeContainerComponent implements OnInit, OnDestroy {

  @Select(StepperStore.getCurrentStep) currenStep$: Observable<string>;
  private allSteps: string[];
currentStep = 'organisation';
  constructor(private router: Router, private store: Store ) {}

  ngOnInit() {
    this.allSteps = this.store.selectSnapshot(state => state.stepper.steps);
  }
  
  ngOnDestroy() {
    console.log(this.store.selectSnapshot(DemandeStore.getCurrentDemande));
  }

  backwardActionOnClick() {
    this.currenStep$.pipe(
      take(1),
      tap(currentStep => {
        if (this.allSteps.indexOf(currentStep) === 0) {
          // Nous sommes à la première étape du formulaire donc faire l'action correspondante
        } else {
          this.router.navigate(['demande/', this.allSteps[(this.allSteps.indexOf(currentStep) - 1)]]);
        }
      })
    ).subscribe();
  }

  forwardActionOnClick() {
    this.currenStep$.pipe(
      take(1),
      tap(currentStep => {
        if (this.allSteps.indexOf(currentStep) === (this.allSteps.length - 1)) {
          // Nous sommes a la dernière étape du formulaire, faire l'action appropriée
        } else {
          this.router.navigate(['demande/', this.allSteps[(this.allSteps.indexOf(currentStep) + 1)]]);
        }
      })
    ).subscribe();
  }
}

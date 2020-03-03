import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { DemandeStore, SetDemande } from '../../stores/demande.store';
import { SetCurrentStep, SetDisableButtonValue } from '../../stores/stepper.store';

@Component({
  selector: 'app-other-step-form',
  templateUrl: './other-step-form.component.html',
  styleUrls: ['./other-step-form.component.scss']
})
export class OtherStepFormComponent  implements OnInit, OnDestroy {
  @Select(DemandeStore.getCurrentDemande) demande$: Observable<any>;
  private subscription = new Subscription();
  favForm = this.fb.group({
    favoriteGame: ['', Validators.required],
    favoriteMeal: ['', Validators.required],
    favoriteBeverage: ['', [Validators.required]],
    favoritePlace: ['', [Validators.required]],
  });
  errors = {
    favoriteGame: {
      required: 'Le jeu favori est obligatoire'
    },
    favoriteMeal: {
      required: 'Le plat favori est obligatoire'
    },
    favoriteBeverage: {
      required: `La boisson favorite est obligatoire`,
    },
    favoritePlace: {
      required: 'Le lieu favori est obligatoire',
    }
  };

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new SetCurrentStep('etape2'));
    this.demande$.pipe(
      take(1),
      tap(demandeFromStore => {
        if (demandeFromStore !== null /** Ou tout autre check pertinent */) {
          // REMPLIR LE FORMULAIRE AVEC LES DATA
        }})
        ).subscribe();
    this.store.dispatch(new SetDisableButtonValue(this.favForm.status !== 'VALID'));
    this.subscription.add(this.favForm.statusChanges.pipe(
      tap(status => this.store.dispatch(new SetDisableButtonValue(status !== 'VALID'))),
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.favForm.valid) {
      this.store.dispatch(new SetDemande(this.favForm.getRawValue()));
    } else {
      console.log('pas valide');
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { DemandeStore, SetDemande } from '../../stores/demande.store';
import { SetCurrentStep, SetDisableButtonValue } from '../../stores/stepper.store';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.scss']
})
export class OrganisationFormComponent  implements OnInit, OnDestroy {
  @Select(DemandeStore.getCurrentDemande) demande$: Observable<any>;
  private subscription = new Subscription();
  public organisationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  });
  public errors = {
    firstName: {
      required: 'Le prénom est obligatoire'
    },
    lastName: {
      required: 'Le nom est obligatoire'
    },
    email: {
      required: `L'email est obligatoire`,
      email: `Doit être au format email`
    },
    phoneNumber: {
      required: 'Le numéro de téléphone est obligatoire',
      minlength: 'Doit faire 10 chiffres',
      maxlength: 'Doit faire 10 chiffres',
    }
  };

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new SetCurrentStep('organisation'));
    this.demande$.pipe(
      take(1),
      tap(demandeFromStore => {
        if (demandeFromStore !== null /** Ou tout autre check pertinent */) {
          // REMPLIR LE FORMULAIRE AVEC LES DATA
        }})
        ).subscribe();
    this.store.dispatch(new SetDisableButtonValue(this.organisationForm.status !== 'VALID'));
    this.subscription.add(this.organisationForm.statusChanges.pipe(
      tap(status => this.store.dispatch(new SetDisableButtonValue(status !== 'VALID'))),
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.organisationForm.valid) {
      this.store.dispatch(new SetDemande(this.organisationForm.getRawValue()));
    } else {
      console.log('pas valide');
    }
  }

}

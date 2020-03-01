import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { StepperStore } from './stepper.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @Select(StepperStore.getCurrentStep) currenStep$: Observable<string>;
  private allSteps: string[];

  constructor(private router: Router, private store: Store ) {}

  ngOnInit() {
    this.allSteps = this.store.selectSnapshot(state => state.stepper.steps);
  }

  backwardActionOnClick() {
    this.currenStep$.pipe(
      take(1),
      tap(currentStep => {
        if (this.allSteps.indexOf(currentStep) === 0) {
          // Nous sommes à la première étape du formulaire donc faire l'action correspondante
        } else {
          this.router.navigate([this.allSteps[(this.allSteps.indexOf(currentStep) - 1)]]);
        }
      })
    ).subscribe();
  }

  forwardActionOnClick() {
    // RECEVOIR UN BOOLEAN POUR SAVOIR SI IL EST DISABLED QUI POURRA CHANGER EN FONCTION DU VALID DU FORM
    // EMETTRE UN EVENT A CHAQUE CLICK POUR QUE LE FORM COMPONENT ENREGITRE LA VALUE (en bdd ou local storage) & fasse la redirection

    // ENCORE MIEUX!!! => NE RIEN METTRE ICI ET METTRE UN CLICKEVENT DANS LE FORMCOMP! :D OU SE BASER SUR LA DATA DU STORESTEPPER?
    this.currenStep$.pipe(
      take(1),
      tap(currentStep => {
        if (this.allSteps.indexOf(currentStep) === (this.allSteps.length - 1)) {
          // Nous sommes a la dernière étape du formulaire, faire l'action appropriée
        } else {
          this.router.navigate([this.allSteps[(this.allSteps.indexOf(currentStep) + 1)]]);
        }
      })
    ).subscribe();
  }
}

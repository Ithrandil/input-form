import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    console.log('all steps from store oninit app.comp', this.allSteps);
    
  }

  actionOnClick() {
    // RECEVOIR UN BOOLEAN POUR SAVOIR SI IL EST DISABLED QUI POURRA CHANGER EN FONCTION DU VALID DU FORM
    // EMETTRE UN EVENT A CHAQUE CLICK POUR QUE LE FORM COMPONENT ENREGITRE LA VALUE (en bdd ou local storage) & fasse la redirection

    // ENCORE MIEUX!!! => NE RIEN METTRE ICI ET METTRE UN CLICKEVENT DANS LE FORMCOMP! :D OU SE BASER SUR LA DATA DU STORESTEPPER?
    this.currenStep$.pipe(
      tap(currentStep => console.log('currentStep', currentStep)),
      tap(currentStep => console.log('index de currentstep', this.allSteps.indexOf(currentStep))),
      tap(currentStep => this.router.navigate[this.allSteps[(this.allSteps.indexOf(currentStep) + 1)]])
    ).subscribe();
  }
}

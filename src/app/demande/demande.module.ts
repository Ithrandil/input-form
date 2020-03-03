import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ButtonModule } from '../components/button/button.module';
import { InputModule } from '../components/input/input.module';
import { BackgroundImageDirective } from '../directives/background-image.directive';
import { OrganisationFormComponent } from './components/organisation-form/organisation-form.component';
import { OtherStepFormComponent } from './components/otherstep-form/other-step-form.component';
import { DemandeContainerComponent } from './containers/demande-container/demande-container.component';
import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeStore } from './stores/demande.store';
import { StepperStore } from './stores/stepper.store';

@NgModule({
  declarations: [
    BackgroundImageDirective,
    DemandeContainerComponent,
    OrganisationFormComponent,
    OtherStepFormComponent
  ],
  imports: [
    InputModule,
    ButtonModule,
    NgxsModule.forFeature([StepperStore, DemandeStore]),
    CommonModule,
    DemandeRoutingModule
  ],
})
export class DemandeModule { }

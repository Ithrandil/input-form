import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { DemandeStore } from './demande.store';
import { InputComponent } from './input/input.component';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OtherStepFormComponent } from './otherstep-form/other-step-form.component';
import { StepperStore } from './stepper.store';



@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    OrganisationFormComponent,
    OtherStepFormComponent
  ],
  imports: [
    NgxsModule.forRoot([StepperStore, DemandeStore]),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

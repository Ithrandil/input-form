import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganisationFormComponent } from './components/organisation-form/organisation-form.component';
import { OtherStepFormComponent } from './components/otherstep-form/other-step-form.component';
import { DemandeContainerComponent } from './containers/demande-container/demande-container.component';

const routes: Routes = [
  {path: 'demande', component: DemandeContainerComponent,
  children: [
    {path: 'organisation', component: OrganisationFormComponent},
    {path: 'etape2', component: OtherStepFormComponent},
    {path: '', redirectTo: 'organisation', pathMatch: 'full'},
  ]},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }

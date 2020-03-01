import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OtherStepFormComponent } from './otherstep-form/other-step-form.component';

const routes: Routes = [
  {path: 'organisation', component: OrganisationFormComponent},
  {path: 'etape2', component: OtherStepFormComponent},
  {path: '', redirectTo: 'organisation', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

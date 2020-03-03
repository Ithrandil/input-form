import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemandeContainerComponent } from './demande/containers/demande-container/demande-container.component';


const routes: Routes = [
  {path: 'demande', component: DemandeContainerComponent},
  {path: '', redirectTo: 'demande', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

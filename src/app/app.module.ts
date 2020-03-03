import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DemandeModule } from './demande/demande.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    DemandeModule,
    NgxsModule.forRoot([], { developmentMode: true }),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

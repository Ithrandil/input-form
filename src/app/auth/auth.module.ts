import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthService } from './service/auth.service';
import { AuthStore } from './store/auth.store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AuthStore])
  ],
  providers: [AuthService]
})
export class AuthModule { }

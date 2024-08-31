import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { AllProgramsComponent } from './all-programs/all-programs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { DailyExercisesComponent } from './daily-exercises/daily-exercises.component';

@NgModule({
  declarations: [
    HomeComponent,
    AllProgramsComponent,
    DailyExercisesComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class PublicModule { }

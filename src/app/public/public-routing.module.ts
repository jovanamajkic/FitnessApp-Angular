import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProgramsComponent } from './all-programs/all-programs.component';
import { ProgramDetailsComponent } from '../shared-components/program-details/program-details.component';
import { DailyExercisesComponent } from './daily-exercises/daily-exercises.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'programs',
        component: AllProgramsComponent
    },
    { 
        path: 'program/:id', 
        component: ProgramDetailsComponent 
    },
    {
        path: 'exercises',
        component: DailyExercisesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
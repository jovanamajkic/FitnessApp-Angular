import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttributesDialogComponent } from './attributes-dialog/attributes-dialog.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BuyProgramDialogComponent } from './buy-program-dialog/buy-program-dialog.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { NewTrackerDialogComponent } from './new-tracker-dialog/new-tracker-dialog.component';

@NgModule({
  declarations: [
    ProgramListComponent,
    SearchDialogComponent,
    FilterDialogComponent,
    ProgramDetailsComponent,
    AttributesDialogComponent,
    CommentDialogComponent,
    ConfirmationDialogComponent,
    BuyProgramDialogComponent,
    VideoDialogComponent,
    NewTrackerDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProgramListComponent,
    SearchDialogComponent,
    FilterDialogComponent,
    ProgramDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedComponentsModule { }

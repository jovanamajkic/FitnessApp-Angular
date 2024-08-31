import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { UserProfileComponent } from '../protected/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProgramsComponent } from '../protected/my-programs/my-programs.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { NewProgramComponent } from './new-program/new-program.component';
import { PurchasedProgramsComponent } from './purchased-programs/purchased-programs.component';
import { ActivityTrackerComponent } from './activity-tracker/activity-tracker.component';
import { BaseChartDirective } from 'ng2-charts';
import { ConsultantMessageComponent } from './consultant-message/consultant-message.component';
import { InboxComponent } from './inbox/inbox.component';
import { CategorySubscriptionComponent } from './category-subscription/category-subscription.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    MyProgramsComponent,
    NewProgramComponent,
    PurchasedProgramsComponent,
    ActivityTrackerComponent,
    ConsultantMessageComponent,
    InboxComponent,
    CategorySubscriptionComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    BaseChartDirective
  ]
})
export class ProtectedModule { }

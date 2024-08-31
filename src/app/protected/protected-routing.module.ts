import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { NewProgramComponent } from './new-program/new-program.component';
import { PurchasedProgramsComponent } from './purchased-programs/purchased-programs.component';
import { ActivityTrackerComponent } from './activity-tracker/activity-tracker.component';
import { ConsultantMessageComponent } from './consultant-message/consultant-message.component';
import { InboxComponent } from './inbox/inbox.component';
import { CategorySubscriptionComponent } from './category-subscription/category-subscription.component';

const routes: Routes = [
    {
        path: 'myprofile',
        component: UserProfileComponent
    },
    {
        path: 'myprograms',
        component: MyProgramsComponent
    },
    {
        path: 'newprogram',
        component: NewProgramComponent
    },
    {
        path: 'purchased_programs',
        component: PurchasedProgramsComponent
    },
    {
        path: 'activity_tracker',
        component: ActivityTrackerComponent
    },
    {
        path: 'consultant_message',
        component: ConsultantMessageComponent
    },
    {
        path: 'inbox',
        component: InboxComponent
    },
    {
        path: 'category_subscription',
        component: CategorySubscriptionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProtectedRoutingModule { }
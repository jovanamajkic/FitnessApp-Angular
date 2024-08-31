import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { LoginComponent } from "./login/login.component";
import { ActivateComponent } from "./activate/activate.component";

const routes: Routes = [{
    path: '',
    component: AppComponent,
    children: [
        {
            path: 'login', 
            component: LoginComponent
        },
        {
            path: 'activate',
            component: ActivateComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}
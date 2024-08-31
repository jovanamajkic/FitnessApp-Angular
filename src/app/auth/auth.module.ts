import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AppMaterialModule } from "../app-material/app-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivateComponent } from './activate/activate.component';
import { ActivationModalComponent } from './activation-modal/activation-modal.component';

@NgModule({
    declarations: [
        LoginComponent,
        AuthComponent,
        ActivateComponent,
        ActivationModalComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AppMaterialModule,
        ReactiveFormsModule
    ]

})

export class AuthModule {}
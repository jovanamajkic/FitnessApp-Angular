import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AppMaterialModule } from "../app-material/app-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivateComponent } from './activate/activate.component';

@NgModule({
    declarations: [
        LoginComponent,
        ActivateComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AppMaterialModule,
        ReactiveFormsModule
    ]

})

export class AuthModule {}
import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { AuthGuardService, AuthGuardServiceLogged } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuardServiceLogged]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardServiceLogged]
    }
];

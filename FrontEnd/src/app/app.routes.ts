import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { AuthGuardService, AuthGuardServiceLogged, AuthGuardServiceValidAdmin } from './core/auth/auth.guard';
import { ProfilePageComponent } from './features/home/pages/profile-page/profile-page.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AdminDashboardComponent } from './features/admin/pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuardServiceLogged]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardServiceLogged]
    },
    {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuardService, AuthGuardServiceValidAdmin]
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];

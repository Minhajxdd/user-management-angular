import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];

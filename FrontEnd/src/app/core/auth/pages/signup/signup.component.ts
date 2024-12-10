import { Component, DestroyRef, inject, signal } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { singupForm } from './form.signup';
import { AuthService } from '../../auth.service';
import { signupData } from '../../auth.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  form = singupForm;
  errorText = signal('');

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private destoryRef = inject(DestroyRef);

  onSubmit() {
    if (
      this.form.controls.fullname.touched &&
      this.form.controls.fullname.dirty &&
      this.form.controls.fullname.invalid
    ) {
      return this.errorText.set('Please Enter valid Full Name!')
    }

    if (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    ) {
      return this.errorText.set('Please Enter valid Email!')
    }

    if (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    ) {
      return this.errorText.set('Please Enter valid password!')
    }

    if (
      this.form.controls.password.untouched ||
      this.form.controls.fullname.untouched ||
      this.form.controls.email.untouched
    ) {
      return this.errorText.set(`All fields are required`)
    }


    const enteredFullName = this.form.value.fullname;
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    if (enteredFullName && enteredEmail && enteredPassword) {
      const data: signupData = {
        fullname: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
      }

      const subscription = this.authService.sentSignupRequest(data)
        .subscribe({
          error: (err) => {
            this.errorText.set(err.error);
          },
          complete: () => {
            this.form.reset();
            this.router.navigate(['/login'], {replaceUrl: true});
          }
        })

        this.destoryRef.onDestroy(() => {
          subscription.unsubscribe();
        })
    }


  }

}
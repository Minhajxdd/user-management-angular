import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { loginForm } from './form.login';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = loginForm;
  errorText = signal('');

  private authService: AuthService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
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
      this.form.controls.email.untouched
    ) {
      return this.errorText.set(`All fields are required`)
    }

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    if (enteredEmail && enteredPassword) {
      const data = {
        email: enteredEmail,
        password: enteredPassword
      }

      this.authService.login(data)
        .subscribe({
          error: (err) => {
            this.errorText.set(err.error);
          },
          complete: () => {
            this.form.reset();
            this.router.navigate(['/'], { replaceUrl: true });
          }
        })

    }

  }
}

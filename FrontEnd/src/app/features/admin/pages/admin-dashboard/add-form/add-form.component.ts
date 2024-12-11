import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { addAdminForm } from './form.admin.add';
import { ReactiveFormsModule } from '@angular/forms';
import { signupData } from '../../../../../core/auth/auth.model';
import { AuthService } from '../../../../../core/auth/auth.service';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent {
  close = output();

  form = addAdminForm;
  errorText = signal('');

  private authService = inject(AuthService);
  private destoryRef = inject(DestroyRef);

  closeForm() {
    this.close.emit()
  }

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

    const EnteredFullName = this.form.value.fullname;
    const EnteredEmail = this.form.value.email;
    const EnteredPassword = this.form.value.password;

    if (EnteredFullName && EnteredEmail && EnteredPassword) {
      const data: signupData = {
        fullname: EnteredFullName,
        email: EnteredEmail,
        password: EnteredPassword,
      }

      const subscription = this.authService.sentSignupRequest(data)
        .subscribe({
          error: (err) => {
            this.errorText.set(err.error);
          },
          complete: () => {
            this.form.reset();
            this.closeForm();
          }
        })

        this.destoryRef.onDestroy(() => {
          subscription.unsubscribe();
        })
    }
  }
}

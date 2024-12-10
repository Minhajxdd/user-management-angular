import { Component, signal } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { singupForm } from './form.signup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  form = singupForm;
  errorText = signal('');

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

    if(
      this.form.controls.password.untouched ||
      this.form.controls.fullname.untouched ||
      this.form.controls.email.untouched
    ) {
      return this.errorText.set(`All fields are required`)
    }


    const enteredFullName = this.form.value.fullname;
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredFullName, enteredEmail, enteredPassword)
  }
}
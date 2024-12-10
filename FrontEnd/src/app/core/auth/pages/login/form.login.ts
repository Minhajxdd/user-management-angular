import { FormControl, FormGroup, Validators } from "@angular/forms";

export const loginForm = new FormGroup({
    email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)
    ]),

    password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/) // at least 1 letter, 1 number, and special chars allowed
    ])
});

import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

export const editForm = new FormGroup({
    fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        fullNameValidator()
    ]),

    email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)
    ]),

});

function fullNameValidator() {
    return (control: AbstractControl) => {
        if (control.value) {
            const trimmedValue = control.value.trim();

            if (trimmedValue.length < 3) {
                return { 'minLength': { 'requiredLength': 3, 'actualLength': trimmedValue.length } };
            }

            const namePattern = /^[a-zA-Z\s]+$/;

            if (!namePattern.test(trimmedValue)) {
                return { 'pattern': { value: control.value } };
            }
        }
        return null;
    };
}

import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
    FormGroup,
    FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    submitted = false;
    registerForm: FormGroup;

    constructor(
        public router: Router,
        public fb: FormBuilder
    ) {
        this.registerForm = this.fb.group(
            {
                userName: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                confirmPassword: ['', Validators.required],
            },
            { validators: this.passwordsMatchValidator() }
        );
    }

    ngOnInit(): void { }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    get userName() {
        return this.registerForm.get('userName');
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const { userName, email, password } = this.registerForm.value;

        // do something with the form data, e.g. send it to a server
    }

    public passwordsMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get('password')?.value;
            const confirmPassword = control.get('confirmPassword')?.value;
            if (password && confirmPassword && password !== confirmPassword) {
                return { passwordsDontMatch: true };
            } else {
                return null;
            }
        };
    }
}
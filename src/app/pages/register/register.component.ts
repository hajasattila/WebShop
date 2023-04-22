import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    submitted = false;
    registerForm: FormGroup;

    loadingSubscription?: Subscription;
    loadingObservation?: Observable<boolean>;
    loading: boolean = false;

    constructor(
        public router: Router,
        public fb: FormBuilder,
        private authService: AuthService
    ) {
        this.registerForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                confirmPassword: ['', Validators.required],
            },
            { validators: passwordsMatchValidator }
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
        this.loading = true;

        this.authService.signup(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
            .then(cred => {
                console.log(cred);
                this.router.navigateByUrl('/login');
                alert('Sikeresen regisztráltál!')
                this.loading = false;
            }).catch(error => {
                console.error(error);
                this.loading = false;
                alert('Nem sikerült regisztrálni!')
            });

    }
}

const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('rePassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
        return { passwordsDontMatch: true };
    } else {
        return null;
    }
};
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

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
    showPassword: boolean = false;
    constructor(public router: Router, public fb: FormBuilder, private authService: AuthService, private userService: UserService,) {
        /* this.registerForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                rePassword: ['', Validators.required],
            },
            { validators: passwordsMatchValidator }
        ); */
        this.registerForm = new FormGroup({
            id: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            username: new FormControl(''),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]),
            rePassword: new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void { }
    onSubmit() {
        this.loading = true;
        this.authService.signup(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then(cred => {
            console.log(cred);
            const user: User = {
                id: cred.user?.uid as string,
                email: this.registerForm.get('email')?.value,
                username: this.registerForm.get('email')?.value.split('@')[0]
            };
            this.userService.create(user).then(_ => {
                console.log('Sikeresen hozzáadva!')
            }).catch(error => {
                console.error(error);
            });
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
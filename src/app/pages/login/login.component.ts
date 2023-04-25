import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  /* @Output a regisztáció esetén*/
  @Output() userRegistered: EventEmitter<any> = new EventEmitter<any>(); // @Output property a regisztráció esetén

  loginForm: FormGroup;
  showPassword: boolean = false;

  email = new FormControl('');
  password = new FormControl('');
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home');
      alert('Üdvözlünk: ' + this.loginForm.get('email')?.value.split('@')[0] + '!');
      this.loading = false;
      this.userRegistered.emit(); // a regisztráció esetén kibocsátjuk az @Output property-t
    }).catch(error => {
      console.error(error);
      this.loading = false;
      alert('Nem sikerült belépni!')
    });
  }

  /*Lifecycle hook*/
  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}

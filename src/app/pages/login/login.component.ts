import { Component, OnDestroy, OnInit } from '@angular/core';
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
  loginForm: FormGroup;

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
    }).catch(error => {
      console.error(error);
      this.loading = false;
      alert('Nem sikerült belépni!')
    });
  }
  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}


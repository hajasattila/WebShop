import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  /* leggalább 4 különböző rout*/
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    //AuthGuard 1
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderComponent,
    //AuthGuard 2
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: HomeComponent // vagy PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

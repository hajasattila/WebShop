import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

    constructor(private cartService: CartService) { }
}
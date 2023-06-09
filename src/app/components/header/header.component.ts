import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()      //1 input
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  isLoggedIn = false;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.authService.isUserLoggedIn().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
  

  onViewCart(): void {
    if (!this.isLoggedIn) {
      alert('Először jelentkezzen be!');
      return;
    }
  }

  logout() {
    this.authService.logout();
    alert('Viszlát!');
    return;
  }
  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
    if (this.cart.items.length === 0) {
      // Ha az elemek tömbje üres, jelezzük az üres kosarat
      this.onClearCartTwo();
    }
  }

  onClearCartTwo(): void {
    this.cartService.clearCartTwo();
  }
}

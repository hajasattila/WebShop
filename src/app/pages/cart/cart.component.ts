import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  displayedColumns: string[] = ['product', 'name', 'price', 'quantity', 'total', 'action'];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;
  isLoggedIn = false;

  constructor(private cartService: CartService, private authService: AuthService, private firestore: AngularFirestore, private orderService: OrderService,) {
    this.authService.isUserLoggedIn().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });

  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onCheckout(): void {
    if (this.cart.items.length === 0) {
      return;
    }

    this.authService.isUserLoggedIn().subscribe((user) => {
      if (user) {
        const timestamp = new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const ordersCollection = this.firestore.collection('Orders');

        for (const item of this.cart.items) {
          const order: Order = {
            id: `${user?.uid}-${new Date().toISOString()}`, // az id tartalmazza a felhasználó azonosítóját és a rendelés idejét
            person: user?.email?.split('@')[0] as string,
            productName: item.name,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            timestamp: timestamp
          };
          this.orderService.create(order).then(_ => {
            console.log('Leadtuk a rendelést!')
          }).catch(error => {
            console.error(error);
          });;
        }
        alert('Leadtuk a rendelést!')
        this.cartService.clearCart();
      } else {
        alert('Kérlek először jelentkezz be!');
        window.location.href = '/home';
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}

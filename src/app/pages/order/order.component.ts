import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  email: string | null = null;
  orders: Order[] = [];
  displayedColumns: string[] = ['productName', 'quantity', 'totalPrice', 'timestamp','actions'];
  highlightedId: string | null = null;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((user) => {
      if (user) {
        this.email = user.email;
        // lekérheted az összes rendelést és betöltheted az orders tömbbe
        this.orderService.getAll().subscribe(orders => {
          this.orders = orders;
        });
      } else {
        this.email = null;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { DateFormatPipe } from 'src/app/pages/order/date.pipe';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  email: string | null = null;
  orders: Order[] = [];
  displayedColumns: string[] = ['productName', 'quantity', 'totalPrice', 'timestamp', 'actions'];
  highlightedId: string | null = null;
  dateFormatPipe: DateFormatPipe = new DateFormatPipe();

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((user) => {
      if (user) {
        this.email = user.email;
        // csak az aktuális felhasználó által leadott rendeléseket töltjük be
        this.orderService.getAll(user.uid).subscribe(orders => {
          this.orders = orders;
        });
      } else {
        this.email = null;
      }
    });
  }

  highlightOrder(id: string) {
    this.highlightedId = id;
  }
  deleteOrder(order: Order) {
    if (confirm('Biztosan törölni szeretné ezt a rendelést?')) {
      this.orderService.delete(order).then(() => {
        this.orders = this.orders.filter(o => o !== order);
      });
    }
  }
}

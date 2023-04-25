import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor() { }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  showFullTitle(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('truncate');
  }

  hideFullTitle(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('truncate-text');
  }
}

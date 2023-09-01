import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.components.html',
  styles: [
  ]
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;

  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter<Product>()

  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }

}

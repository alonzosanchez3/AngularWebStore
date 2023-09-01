import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent {

  cart: Cart = {items: []};

  dataSource: CartItem[] = []
  displayedColumns: string[] = [
    'product',
      'name',
      'price',
      'quantity',
      'total',
      'action'
    ]

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: CartItem[]): number {
    return items.map((item) => {
      return item.price * item.quantity
    })
    .reduce((prev, current) => prev + current, 0)
  }

  onClearAll() {
    this.cartService.clearCart()
  }

  onClearItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddItem(item: CartItem) {
    this.cartService.addToCart(item)
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeOneItemFromCart(item)
  }


}

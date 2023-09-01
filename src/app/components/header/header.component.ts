import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  private _cart: Cart = {items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items.map((item) => {
      return item.quantity
    })
    .reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  getTotal(items: CartItem[]): number {
    return items.map((item) => {
      return item.price * item.quantity
    }).reduce((prev, current) => {
      return prev + current
    }, 0)
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  constructor(private cartService: CartService) {

  }
}

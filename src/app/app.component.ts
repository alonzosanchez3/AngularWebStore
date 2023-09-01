import { Component } from '@angular/core';
import { Cart } from './models/cart';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header [cart]="cart"/>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  cart: Cart = {items: []}

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((value) => {
      this.cart = value;
    })
  }
}

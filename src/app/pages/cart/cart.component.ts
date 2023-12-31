import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import {loadStripe} from '@stripe/stripe-js'
import { environment } from 'src/environments/environment';

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

  constructor(private cartService: CartService, private http: HttpClient) {

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
    console.log(environment.apiKey)
  }

  onClearItem(item: CartItem) {
    this.cartService.removeFromCart(item);
    console.log(environment.apiKey)
  }

  onAddItem(item: CartItem) {
    this.cartService.addToCart(item)
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeOneItemFromCart(item)
  }

  onCheckout() {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      console.log(environment.apiKey)
      let stripe = await loadStripe("pk_test_51NlQzWG9MLiQo8RG4oST1Fywg4KXpa9ipTBWEX3FDrl2cqVvc2MBFVWaPZM9wJa9vKc5MPDBXVWLVrCeZfjjlhf400eqHsAz0x");
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }


}

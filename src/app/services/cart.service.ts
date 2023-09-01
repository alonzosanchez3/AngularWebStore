import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []})


  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => {
      return _item.id === item.id
    })

    if(itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item)
    }

    this.cart.next({items})
    this._snackBar.open('1 item added to cart.', 'Ok', {duration: 3000})
    console.log(this.cart.value)
  }

  clearCart() {
    this.cart.next({items: []})
    this._snackBar.open('Cart was cleared', 'Ok', {duration: 2000})
  }

  removeFromCart(item: CartItem) {
    const filteredItems = this.cart.value.items.filter((_item) => {
      return _item.id !== item.id
    })
    this.cart.next({items: filteredItems})
    this._snackBar.open('1 item removed from cart', 'Ok', {duration: 2000})
  }

  removeOneItemFromCart(item: CartItem) {

    if(item.quantity === 1) {
      return this.removeFromCart(item)
    } else {
      const foundItem = this.cart.value.items.find((_item) => {
        return _item.id === item.id
      })
      foundItem!.quantity -= 1
      this.cart.next({items: [...this.cart.value.items]})
      this._snackBar.open('1 item removed from item quantity', 'OK', {duration: 2000})
    }
  }
}

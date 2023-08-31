import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent {

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'jordans',
    price: 250,
    quantity: 2,
    id: 2
  }
]};

  dataSource: CartItem[] = []
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  getTotal(items: CartItem[]): number {
    return items.map((item) => {
      return item.price * item.quantity
    })
    .reduce((prev, current) => prev + current, 0)
  }

  ngOnInit() {
    this.dataSource = this.cart.items;
  }

}

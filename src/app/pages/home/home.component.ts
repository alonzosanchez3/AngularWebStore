import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]: number} = {
  1: 400,
  3: 335,
  4: 350
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private cartService: CartService, private storeService: StoreService) {}

  category: string | undefined;
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns]
  products: Product[] | undefined
  sort ='desc'
  count = '12'
  productSubscription: Subscription | undefined

  ngOnInit() {
    this.getProducts()
  }

  onSortSelectionChange(sort: string) {
    this.sort = sort;
    this.getProducts();
  }

  onItemSelectionChange(count: string) {
    this.count = count;
    this.getProducts();
  }

  getProducts() {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products
    })
  }

  onColumnsCountChange(cols: number) {
    this.columns = cols;
    this.rowHeight = ROWS_HEIGHT[this.columns]
  }

  onShowCategory(category: string): void {
    this.category = category
    this.getProducts()
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe()
  }

}

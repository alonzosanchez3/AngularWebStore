import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.components.html',
  styles: [
  ]
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;

}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output()
  columnsCountChange = new EventEmitter<number>();

  sort = 'desc'
  itemsShowCount: number = 12

  onSortUpdated (newSort: string): void {
    this.sort = newSort
  }

  onItemCountUpdated(itemCount: number): void {
    this.itemsShowCount = itemCount
  }

  onColumnUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }

}

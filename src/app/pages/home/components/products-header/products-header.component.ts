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
  @Output() sortSelectionChange = new EventEmitter<string>();
  @Output() itemSelectionChange = new EventEmitter<string>();

  sort = 'desc'
  itemsShowCount: number = 12

  onSortUpdated (newSort: string): void {
    this.sortSelectionChange.emit(newSort)
    this.sort = newSort
  }

  onItemCountUpdated(itemCount: string): void {
    this.itemSelectionChange.emit(itemCount)
    this.itemsShowCount = parseInt(itemCount)
  }

  onColumnUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }

}

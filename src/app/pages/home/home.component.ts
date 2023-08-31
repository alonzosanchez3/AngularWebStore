import { Component } from '@angular/core';

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

  category: string | undefined;
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns]

  onColumnsCountChange(cols: number) {
    this.columns = cols;
    this.rowHeight = ROWS_HEIGHT[this.columns]
  }

  onShowCategory(category: string): void {
    this.category = category
  }

}

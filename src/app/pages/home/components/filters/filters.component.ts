import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [
  ]
})
export class FiltersComponent {

  @Output() showCategory = new EventEmitter<string>()

  categories: string[] | undefined
  categorySubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {

  }

  ngOnInit() {
    this.categorySubscription = this.storeService.getAllCategories().subscribe((value) => {
      this.categories = value;
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }

  ngOnDestroy() {
    this.categorySubscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from '../services/inventory.service';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-inventory-list',
  standalone: false, 
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'stock', 'lastUpdated', 'actions'];
  selectedItem: InventoryItem | null = null;
  inventory$: Observable<InventoryItem[]>;

  // BehaviorSubjects for search and filter
  private searchTerm$ = new BehaviorSubject<string>('');
  private stockFilter$ = new BehaviorSubject<string>('all');

  constructor(private inventoryService: InventoryService) {
    this.inventory$ = this.inventoryService.getInventory();
  }

  ngOnInit(): void {
    // Initialize the filtered inventory stream
    this.filteredInventory$ = combineLatest([
      this.inventory$,
      this.searchTerm$.pipe(startWith('')),
      this.stockFilter$.pipe(startWith('all'))
    ]).pipe(
      map(([items, searchTerm, stockFilter]) => {
        return items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (stockFilter === 'all' ||
            (stockFilter === 'low' && item.stock < 5) ||
            (stockFilter === 'in' && item.stock >= 5))
        );
      })
    );
  }

  filteredInventory$!: Observable<InventoryItem[]>;

  editItem(item: InventoryItem) {
    this.selectedItem = { ...item }; // Clone item to prevent direct modification
  }

  deleteItem(id: number) {
    this.inventoryService.deleteItem(id);
  }

  saveChanges(updatedItem: InventoryItem) {
    this.inventoryService.editItem(updatedItem);
    this.selectedItem = null; // Close edit form
  }

  cancelEdit() {
    this.selectedItem = null;
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }

  filterStock(status: string) {
    this.stockFilter$.next(status);
  }

  onItemAdded(newItem: InventoryItem) {
    if (!newItem || !newItem.name) return;
    const itemToAdd: InventoryItem = {
      ...newItem,
      id: Math.floor(Math.random() * 10000),
      lastUpdated: new Date()
    };
    this.inventoryService.addItem(itemToAdd);
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search(target.value);
  }
}

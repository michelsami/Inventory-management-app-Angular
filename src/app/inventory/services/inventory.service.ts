import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define Inventory Item Interface
export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root' // Makes it available globally
})

export class InventoryService {
  // Initial inventory data (mock data)
  private initialInventory: InventoryItem[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', stock: 10, lastUpdated: new Date() },
    { id: 2, name: 'Keyboard', category: 'Accessories', stock: 15, lastUpdated: new Date() },
    { id: 3, name: 'Mouse', category: 'Accessories', stock: 8, lastUpdated: new Date() }
  ];

  // BehaviorSubject for state management
  private inventorySubject = new BehaviorSubject<InventoryItem[]>(this.initialInventory);
  inventory$: Observable<InventoryItem[]> = this.inventorySubject.asObservable();

  // Method to get current inventory list
  getInventory(): Observable<InventoryItem[]> {
    return this.inventory$;
  }

  // Method to add a new inventory item
  addItem(item: InventoryItem) {
    const updatedInventory = [...this.inventorySubject.value, item];
    this.inventorySubject.next(updatedInventory);
  }

  // Method to update an existing item
  editItem(updatedItem: InventoryItem) {
    const updatedInventory = this.inventorySubject.value.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.inventorySubject.next(updatedInventory);
  }

  // Method to delete an item
  deleteItem(id: number) {
    const updatedInventory = this.inventorySubject.value.filter(item => item.id !== id);
    this.inventorySubject.next(updatedInventory);
  }
}

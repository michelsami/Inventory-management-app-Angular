import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory.service';
import { InventoryItem } from '../interfaces/inventory-item.interface';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new item', () => {
    const newItem: InventoryItem = {
      id: 4,
      name: 'Test Item',
      category: 'Test',
      stock: 10,
      lastUpdated: new Date()
    };

    service.addItem(newItem);
    service.getInventory().subscribe(items => {
      expect(items).toContain(newItem);
    });
  });

  it('should update existing item', () => {
    const updatedItem: InventoryItem = {
      id: 1,
      name: 'Updated Item',
      category: 'Updated',
      stock: 20,
      lastUpdated: new Date()
    };

    service.editItem(updatedItem);
    service.getInventory().subscribe(items => {
      const item = items.find(i => i.id === 1);
      expect(item).toEqual(updatedItem);
    });
  });

  it('should delete item', () => {
    service.deleteItem(1);
    service.getInventory().subscribe(items => {
      expect(items.find(i => i.id === 1)).toBeUndefined();
    });
  });
});

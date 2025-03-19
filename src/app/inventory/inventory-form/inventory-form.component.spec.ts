import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryFormComponent } from './inventory-form.component';
import { InventoryItem } from '../services/inventory.service';

describe('InventoryFormComponent', () => {
  let component: InventoryFormComponent;
  let fixture: ComponentFixture<InventoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty form', () => {
    expect(component.inventoryForm.get('name')?.value).toBe('');
    expect(component.inventoryForm.get('category')?.value).toBe('');
    expect(component.inventoryForm.get('stock')?.value).toBe(0);
  });

  it('should validate required fields', () => {
    const form = component.inventoryForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test Item');
    expect(form.controls['name'].valid).toBeTruthy();
    expect(form.valid).toBeFalsy(); // Still false because category is required

    form.controls['category'].setValue('Test Category');
    expect(form.controls['category'].valid).toBeTruthy();
    expect(form.valid).toBeTruthy(); // Now true because all required fields are filled
  });

  it('should validate non-negative stock quantity', () => {
    const stockControl = component.inventoryForm.controls['stock'];
    
    stockControl.setValue(-1);
    expect(stockControl.errors?.['min']).toBeTruthy();
    
    stockControl.setValue(0);
    expect(stockControl.errors).toBeNull();
    
    stockControl.setValue(10);
    expect(stockControl.errors).toBeNull();
  });

  it('should emit save event with valid form data', () => {
    spyOn(component.save, 'emit');
    
    const testItem: InventoryItem = {
      id: 1,
      name: 'Test Item',
      category: 'Test Category',
      stock: 10,
      lastUpdated: new Date()
    };
    
    component.inventoryForm.patchValue(testItem);
    component.onSubmit();
    
    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      name: testItem.name,
      category: testItem.category,
      stock: testItem.stock
    }));
  });

  it('should not emit save event with invalid form data', () => {
    spyOn(component.save, 'emit');
    
    component.onSubmit();
    
    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should emit cancel event and reset form', () => {
    spyOn(component.cancel, 'emit');
    
    component.inventoryForm.patchValue({
      name: 'Test',
      category: 'Test',
      stock: 1
    });
    
    component.onCancel();
    
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.inventoryForm.get('name')?.value).toBe(null);
    expect(component.inventoryForm.get('category')?.value).toBe(null);
    expect(component.inventoryForm.get('stock')?.value).toBe(null);
  });
});

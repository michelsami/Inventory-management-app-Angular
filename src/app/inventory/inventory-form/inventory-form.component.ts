import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
  standalone: false
})
export class InventoryFormComponent implements OnInit {
  @Input() item: InventoryItem | null = null;
  @Output() save = new EventEmitter<InventoryItem>();
  @Output() cancel = new EventEmitter<void>();

  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      lastUpdated: [new Date()]
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.inventoryForm.patchValue(this.item);
    } else {
      // Generate a new ID for new items
      this.inventoryForm.patchValue({
        id: Math.floor(Math.random() * 10000),
        lastUpdated: new Date()
      });
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      this.save.emit(this.inventoryForm.value);
      this.inventoryForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.inventoryForm.reset();
  }
}

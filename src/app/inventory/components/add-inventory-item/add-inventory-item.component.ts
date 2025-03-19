import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-inventory-item',
  standalone: false,
  templateUrl: './add-inventory-item.component.html',
  styleUrls: ['./add-inventory-item.component.css']
})
export class AddInventoryItemComponent {
  itemForm: FormGroup;

  @Output() itemAdded = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem() {
    if (this.itemForm.valid) {
      this.itemAdded.emit(this.itemForm.value);
      this.itemForm.reset();
    }
  }
}

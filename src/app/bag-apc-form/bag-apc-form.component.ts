import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { BaggageHandlingService } from '../baggage-handling.service';

@Component({
  selector: 'app-bag-apc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bag-apc-form.component.html',
  styleUrls: ['./bag-apc-form.component.css']
})
export class BagAPCFormComponent implements OnInit {
  bagsForm!: FormGroup;
  bagRows: any[] = [];
  bagHandlingService: BaggageHandlingService = inject(BaggageHandlingService);

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bagsForm = this.formBuilder.group({
      totalBags: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
      bags: this.formBuilder.array([])
    });
  }

  generateInputBoxes(): void {
    const totalBags = this.bagsForm.value['totalBags'];
    const bagsArray = this.bagsForm.get('bags') as FormArray;
    bagsArray.clear();

    this.bagRows = [];
    // Max 5 input boxes per row. Max 3 rows allowed.
    for (let i = 0; i < totalBags / 5; i++) {
      const row: any[] = [];
      const blocks = totalBags - this.bagRows.length * 5 < 5 ? totalBags % 5 : 5;
      for (let j = 0; j < blocks; j++) {
        row.push(i * 5 + j);
        bagsArray.push(this.formBuilder.control('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,7}$/)]));
      }
      this.bagRows.push(row);
    }
  }

  get bagsArray() {
    return this.bagsForm.get('bags') as FormArray;
  }

  printErrorMessages(): any {
    for (let i = 0; i < this.bagsArray.controls.length; i++) {
      const control = this.bagsArray.controls[i];

      if (control.invalid && (control.dirty || control.touched)) {
        let message: string | undefined;
        if (control.hasError('required')) {
          message = 'All APCs are mandatory';
        }
        if (control.hasError('pattern')) {
          message = 'APC must be alphanumeric and 4-7 characters in length.'
        }
        return message;
      }
    }
  }

  submitAPCs(): void {
    if (this.bagsForm.valid) {
      const bagAPCs = this.bagsForm.value.bags;
      this.bagHandlingService.checkInBaggages(bagAPCs)
        .subscribe({
          next: (response: []) => {
            // Handle success response
            this.openSnackBar(response.length + ' Bags Checked-In Successfully', 'OK');
          },
          error: (errors: {
            error: {
              code: string,
              messages: any
            }
          }) => {
            // Handle error response
            var errorMessages = errors.error.messages;
            for (let errorMessage in errorMessages) {
              this.openSnackBar(errorMessages[errorMessage], 'Close');
            }
          }
        });
    } else {
      // Form is invalid
      this.openSnackBar('Form is invalid', 'Close');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000 // Duration in milliseconds
    });
  }
}

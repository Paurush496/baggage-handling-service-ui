import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-check-in-summary',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './check-in-summary.component.html',
  styleUrl: './check-in-summary.component.css'
})
export class CheckInSummaryComponent {
  @Input()
  totalBags!: number;

  @Input() allFlights: any[] = [];
}

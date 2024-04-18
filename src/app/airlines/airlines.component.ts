import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckedInBagsFlights } from '../checked-in-bags-flights';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FlightsDetailsComponent } from '../flights-details/flights-details.component';

@Component({
  selector: 'app-airlines',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FlightsDetailsComponent],
  templateUrl: './airlines.component.html',
  styleUrl: './airlines.component.css'
})
export class AirlinesComponent {
  @Input() airlines: any;
  constructor(public dialog: MatDialog) { }

  totalBags(airline: any): number {
    return airline.reduce(
      (result: any, currentValue: CheckedInBagsFlights) => {
        result = result + currentValue.bagsCount;
        return result;
      }, 0);
  }

  showFlights() {
    this.dialog.open(FlightsDetailsComponent, {
      data: {
        flights: this.airlines.value,
      },
    });
  }
}
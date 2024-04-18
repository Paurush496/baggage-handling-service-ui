import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CheckedInBagsFlights } from '../checked-in-bags-flights';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flights-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatSortModule, CommonModule],
  templateUrl: './flights-details.component.html',
  styleUrl: './flights-details.component.css'
})
export class FlightsDetailsComponent implements AfterViewInit {
  public flights: CheckedInBagsFlights[] = [];

  displayedColumns: string[] = ['flight', 'departure', 'bagsCount'];
  dataSource: any;

  constructor(private _liveAnnouncer: LiveAnnouncer, @Inject(MAT_DIALOG_DATA)
  public data: any) {
    this.flights = data.flights;
    this.dataSource = new MatTableDataSource(this.flights);
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

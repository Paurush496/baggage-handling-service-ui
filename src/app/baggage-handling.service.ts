import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInBaggage } from './check-in-baggage';

@Injectable({
  providedIn: 'root'
})
export class BaggageHandlingService {

  private apiUrl = 'https://baggage-handler-backend-40f0f577f4eb.herokuapp.com/bhs/check-in-baggage';

  constructor(private http: HttpClient) { }

  checkInBaggages(bagAPCs: string[]): Observable<any> {
    let baggages: CheckInBaggage[] = this.createBaggageObjectsFromAPCs(bagAPCs);
    return this.http.post<any>(this.apiUrl, baggages);
  }

  createBaggageObjectsFromAPCs(bagAPCs: string[]): CheckInBaggage[] {
    const baggages: CheckInBaggage[] = [];

    bagAPCs.forEach(bagAPC => {
      const apc: string = this.formatAPC(bagAPC);

      let _weight = 0;
      for (let i = 0; i < apc.length; i++) {
        _weight = _weight + apc.charCodeAt(i);
      }

      var bag: CheckInBaggage = {
        bagAPC: apc,
        weight: _weight / 25,
        bagUId: apc.concat("-" + _weight).concat("tag" + bagAPCs.indexOf(bagAPC)),
        userId: "User-" + bagAPCs.indexOf(bagAPC) + " APC-".concat(apc),
        checkInTime: new Date
      };

      baggages.push(bag);
    });
    return baggages;
  }

  formatAPC(bagAPC: string): string {
    var apcSuffix = bagAPC.substring(2).padStart(5, "0");
    return bagAPC.slice(0, 2).concat(apcSuffix).toUpperCase();
  }

}

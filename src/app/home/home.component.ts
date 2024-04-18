import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { BagAPCFormComponent } from "../bag-apc-form/bag-apc-form.component";
import { SearchComponent } from "../search/search.component";
import { AirlinesComponent } from "../airlines/airlines.component";
import { CheckedInBagsFlights } from '../checked-in-bags-flights';
import { WebSocketService } from '../web-socket.service';
import { CheckInSummaryComponent } from '../check-in-summary/check-in-summary.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavigationComponent, BagAPCFormComponent, SearchComponent, AirlinesComponent, CommonModule, CheckInSummaryComponent]
})
export class HomeComponent {

    bagsInAirlines: any[] = [];
    allFlights: any[] = [];
    totalBags!: number;

    constructor(private webSocketService: WebSocketService) {

        // Open connection with server socket
        let stompClient = this.webSocketService.connect();
        stompClient.connect({}, () => {

            stompClient.subscribe('/topic/update', (notifications: { body: string; }) => {
                const data = JSON.parse(notifications.body);
                this.bagsInAirlines = data.reduce(
                    (airlineFlights: any, bagsInAFlight: CheckedInBagsFlights) => {
                        (airlineFlights[bagsInAFlight.airline] = airlineFlights[bagsInAFlight.airline] || []).push(bagsInAFlight);
                        return airlineFlights;
                    }, {});
                this.totalBags = data.reduce(
                    (totalBags: any, bagsInAFlight: CheckedInBagsFlights) => {
                        totalBags = totalBags + bagsInAFlight.bagsCount;
                        return totalBags;
                    }, 0);
                this.allFlights = [];
                data.forEach((bagsInAFlight: CheckedInBagsFlights) => {
                    const flightInfo = {
                        flight: bagsInAFlight.flight,
                        logoUrl: bagsInAFlight.airlinesLogo
                    };
                    this.allFlights.push(flightInfo);
                });
            })
        });
    }
}

import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: "root",
})
export class WebSocketService {

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJS.default(`https://baggage-handler-backend-40f0f577f4eb.herokuapp.com/ws`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
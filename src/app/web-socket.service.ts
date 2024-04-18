import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: "root",
})
export class WebSocketService {

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJS.default(`http://localhost:8080/ws`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
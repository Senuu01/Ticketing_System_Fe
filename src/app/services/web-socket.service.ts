import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  public messageSubject = new Subject<any>();

  connect(): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket('ws://localhost:8080/ws/simulation');

      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        console.log('Message received from server:', event.data);
        this.messageSubject.next(JSON.parse(event.data));
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Cannot send message:', message);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket disconnected');
    }
    this.socket = null;
  }
}

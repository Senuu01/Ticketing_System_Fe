import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SimulationConfig } from '../models/config.model';
import { SimulationStatus } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class TicketingService {
  private apiUrl = 'http://localhost:8080/api/simulation'; // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}

  private handleError(operation: string) {
    return (err: any): Observable<never> => {
      console.error(`Error during ${operation}:`, err);
      alert(`Failed to ${operation}. Please try again.`);
      return throwError(err);
    };
  }

  startSimulation(config: SimulationConfig): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/start`, config).pipe(
      catchError(this.handleError('start the simulation'))
    );
  }

  stopSimulation(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/stop`, {}).pipe(
      catchError(this.handleError('stop the simulation'))
    );
  }

  getStatus(): Observable<SimulationStatus> {
    return this.http.get<SimulationStatus>(`${this.apiUrl}/status`).pipe(
      retry(3),
      catchError(this.handleError('fetch the simulation status'))
    );
  }
}

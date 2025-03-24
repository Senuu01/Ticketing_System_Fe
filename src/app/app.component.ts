import { Component } from '@angular/core';
import { TicketingService } from './services/ticketing.services';
import { SimulationConfig } from './models/config.model';
import { SimulationStatus } from './models/status.model';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { TicketsBoardComponent } from './components/ticket-board/tickets-board.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ConfigFormComponent,
    TicketsBoardComponent,
    ChartDisplayComponent,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  isRunning = false;
  currentStatus: SimulationStatus | null = null;
  private pollingInterval: ReturnType<typeof setTimeout> | null = null;

  constructor(private ticketingService: TicketingService) {}

  /**
   * Starts the simulation with the provided configuration.
   * @param config - The simulation configuration.
   */
  onStartSimulation(config: SimulationConfig): void {
    if (!this.isValidConfig(config)) {
      console.error('Invalid configuration provided');
      return;
    }

    this.ticketingService.startSimulation(config).subscribe({
      next: () => {
        this.isRunning = true;
        this.pollStatus();
      },
      error: (error) => {
        console.error('Error starting simulation:', error);
      },
    });
  }

  /**
   * Stops the currently running simulation.
   */
  onStopSimulation(): void {
    this.ticketingService.stopSimulation().subscribe({
      next: () => {
        this.isRunning = false;
        this.clearPolling();
      },
      error: (error) => {
        console.error('Error stopping simulation:', error);
      },
    });
  }

  /**
   * Resets the simulation state.
   */
  onResetSimulation(): void {
    this.isRunning = false;
    this.currentStatus = null;
    this.clearPolling();
  }

  /**
   * Polls the server for simulation status updates.
   */
  private pollStatus(): void {
    if (!this.isRunning) return;

    console.log('Polling for status updates...'); // Log when polling starts

    this.pollingInterval = setTimeout(() => {
      this.ticketingService.getStatus().subscribe({
        next: (status) => {
          console.log('Fetched status:', status); // Log the fetched status

          // Update the currentStatus object safely to trigger change detection
          this.currentStatus = { ...status };

          console.log('Updated currentStatus:', this.currentStatus); // Confirm update

          // Continue polling if simulation is still running
          if (this.isRunning) {
            this.pollStatus();
          }
        },
        error: (error) => {
          console.error('Error fetching status:', error); // Log any errors

          // Continue polling even if an error occurs
          if (this.isRunning) {
            this.pollStatus();
          }
        },
      });
    }, 2000);
  }


  /**
   * Clears the polling interval.
   */
  private clearPolling(): void {
    if (this.pollingInterval) {
      clearTimeout(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Validates the simulation configuration.
   * @param config - The simulation configuration.
   * @returns `true` if the configuration is valid; otherwise, `false`.
   */
  private isValidConfig(config: SimulationConfig): boolean {
    return (
      config.maxTicketCapacity > 0 &&
      config.ticketPoolCapacity > 0 &&
      config.vendorCount > 0 &&
      config.customerCount > 0 &&
      config.minVendorRate > 0 &&
      config.maxVendorRate >= config.minVendorRate &&
      config.minCustomerRate > 0 &&
      config.maxCustomerRate >= config.minCustomerRate
    );
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { SimulationConfig } from '../../models/config.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConfigFormComponent {
  @Output() start = new EventEmitter<SimulationConfig>();
  @Output() stop = new EventEmitter<void>(); // Emit stop action to the parent component
  @Output() reset = new EventEmitter<void>(); // Emit reset action to the parent component

  config: SimulationConfig = {
    maxTicketCapacity: 200,
    ticketPoolCapacity: 50,
    vendorCount: 5,
    customerCount: 10,
    minVendorRate: 1,
    maxVendorRate: 5,
    minCustomerRate: 1,
    maxCustomerRate: 5
  };

  /**
   * Emit the current simulation configuration to start the simulation.
   */
  onStart(): void {
    this.start.emit(this.config);
  }

  /**
   * Emit a stop action to the parent component.
   */
  onStop(): void {
    this.stop.emit();
  }

  /**
   * Emit a reset action to the parent component.
   */
  onReset(): void {
    this.reset.emit();
    // Optionally, reset the form values to defaults
    this.config = {
      maxTicketCapacity: 200,
      ticketPoolCapacity: 50,
      vendorCount: 5,
      customerCount: 10,
      minVendorRate: 1,
      maxVendorRate: 5,
      minCustomerRate: 1,
      maxCustomerRate: 5
    };
  }
}

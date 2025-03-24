export interface SimulationStatus {
  totalTicketCount: number;
  maxTicketCapacity: number;
  totalAddTicketCount: number;
  totalSaleTicketCount: number;
  remainingTicketCount: number;
  vendors: { name: string; addedTickets: number; soldTickets: number }[];
  customers: { name: string; soldTickets: number }[];
  timestamps: string[];
  salesData: number[]; // Ensure this is an array
}

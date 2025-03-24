import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tickets-board',
  templateUrl: './tickets-board.component.html',
  styleUrls: ['./tickets-board.component.css'],

  imports: [CommonModule]
})
export class TicketsBoardComponent {
  @Input() status: any;
}

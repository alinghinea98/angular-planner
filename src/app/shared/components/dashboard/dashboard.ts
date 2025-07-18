import { Component } from '@angular/core';
import { Appointment } from '../../../core/models/appointment.type';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
    appointments: Appointment[] = [
      {
        id: '1',
        time: '2023-10-01T10:00:00Z',
        patient: 'John Doe',
        reason: 'Check-up',
        status: 'Confirmed'
      },
      {
        id: '2',
        time: '2023-10-02T14:30:00Z',
        patient: 'Jane Smith',
        reason: 'Follow-up',
        status: 'Pending'
      },
      {
        id: '3',
        time: '2023-10-03T09:00:00Z',
        patient: 'Alice Johnson',
        reason: 'Consultation',
        status: 'Confirmed'
      }
    ];
    
    displayedColumns: string[] = ['time', 'patient', 'reason', 'status', 'actions'];
}

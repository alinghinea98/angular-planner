import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentDialog } from '../../dialogs/create-appointment-dialog/create-appointment-dialog';
import { filter } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../../core/models/appointment.type';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar implements OnInit {

  private readonly _dialog = inject(MatDialog);
  private _appointmentService: AppointmentService = inject(AppointmentService);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    nowIndicator: true,
    events: [],
    dateClick: this._handleDateClick.bind(this),
    eventClick: this._handleEventClick.bind(this),
  };

  ngOnInit() {
    this._appointmentService.getAppointments().subscribe({
      next: (appointments: Appointment[]) => this.calendarOptions.events = appointments.map((app: Appointment) => {
        return {...app, title: `${app.reason}: ${app.patient}`}
      })
    })
  }

  private _handleDateClick(arg: any) {
    const selectedDate = new Date(arg.dateStr);
    const dialogRef = this._dialog.open(CreateAppointmentDialog, {
      data: { date: selectedDate }
    });

    dialogRef.afterClosed().pipe(
      filter(result => result !== undefined)
    ).subscribe(result => {
      const newEvent = {
          title: `${result.reason}: ${result.patient}`,
          start: new Date(result.start).toISOString(),
          end: new Date(result.end).toISOString(),
          extendedProps: {
            reason: result.reason,
            duration: result.duration
          }
        };
      this.calendarOptions.events = [
        ...(Array.isArray(this.calendarOptions.events) ? this.calendarOptions.events : []),
        newEvent
      ];
    });
  }

  private _handleEventClick(arg: any) {
    const dialogRef = this._dialog.open(CreateAppointmentDialog, {
      data: {
        event: arg.event,
        date: arg.event.start
      }
    });
  }
}

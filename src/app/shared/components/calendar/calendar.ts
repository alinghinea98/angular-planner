import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentDialog } from '../../dialogs/create-appointment-dialog/create-appointment-dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar {

  private readonly _dialog = inject(MatDialog);

  calendarOptions = {
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
    events: [
      {
        title: 'Consultation: John Doe',
        start: new Date().toISOString().slice(0, 10) + 'T10:00:00',
        end: new Date().toISOString().slice(0, 10) + 'T11:00:00'
      },
      {
        title: 'Checkup: Jane Smith',
        start: new Date().toISOString().slice(0, 10) + 'T13:00:00',
        end: new Date().toISOString().slice(0, 10) + 'T14:00:00'
      }
    ],
    dateClick: this._handleDateClick.bind(this),
    eventClick: this._handleEventClick.bind(this),
  };

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
        this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
    });
  }

  private _handleEventClick(arg: any) {
    alert('Event: ' + arg.event.title);
  }
}

import { Appointment } from '../../core/models/appointment.type';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private _today = new Date();
  private dummyList: Appointment[] = [
    {
      id: this._today.getSeconds().toString(),
      reason: 'Consultation',
      patient: 'John Doe',
      start: new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate(), 10, 0, 0),
      end: new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate(), 10, 30, 0),
      status: 'Pending'
    },
    {
      id: this._today.getSeconds().toString(),
      reason: 'Meeting',
      patient: 'Patrick Evra',
      start: new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate(), 11, 0, 0),
      end: new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate(), 11, 30, 0),
      status: 'Pending'
    }
  ];

  getAppointments(): Observable<Appointment[]> {
    return of(this.dummyList);
  }
}

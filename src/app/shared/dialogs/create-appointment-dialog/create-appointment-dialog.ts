import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';


@Component({
  selector: 'app-create-appointment-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMomentDateModule,
    MatSelectModule
  ],
  providers: [TimeFormatPipe],
  standalone: true,
  templateUrl: './create-appointment-dialog.html',
  styleUrl: './create-appointment-dialog.scss'
})
export class CreateAppointmentDialog {

  private readonly _timeFormatPipe = inject(TimeFormatPipe);

  patient: string = '';
  reason: string = '';
  time: string = '';
  start: Date;
  duration: number | null = null;
  durationOptions = [10, 15, 30, 45, 60];

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }
  ) {
    this.start = data.date;
  }

  formatTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.time = this._timeFormatPipe.transform(input.value);
  }

  save(): void {
    if (!this.start || !this.time || !this.patient) return;
    this.dialogRef.close({
      patient: this.patient,
      reason: this.reason,
      start: this.start,
      time: this.time
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

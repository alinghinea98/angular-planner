export type Appointment = {
    id: string;
    time?: string;
    start: Date;
    end: Date;
    patient: string;
    reason: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
};

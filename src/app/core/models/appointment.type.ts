export type Appointment = {
    id: string;
    time: string;
    patient: string;
    reason: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
};
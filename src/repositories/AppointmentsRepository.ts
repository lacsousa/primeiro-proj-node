import Appointment from "../models/Appointments";

class AppointmentsRepository { 

    private appointments: Appointment[];

    constructor(){
        this.appointments = [];
    }

    public create ( provider: string , date: Date ) : Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
import { Router } from 'express';
import { startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment from '../models/Appointments';


const appointmentsRouter = Router();

const appointments: Appointment[] = [];

//POST http://localhost:3333/appointments

// Add lib uuidv4 -> yarn add uuidv4
// Add lib date-fns -> yarn add date-fns

appointmentsRouter.post('/', (request, response) => {

    const {provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInSameDate = 
        appointments.find(appointment => isEqual(parsedDate, appointment.date));

    if (findAppointmentInSameDate){
        return response.status(400).json({ message: 'This appointment is already booked.'});
    }    

   /* const appointment = { 
        id: uuid_v4(),
        provider,
        date: parsedDate,
    };
    */
    
    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);
    
    //return response.json({ message: 'Post Appointments'})
    return response.json(appointment);
});

export default appointmentsRouter;
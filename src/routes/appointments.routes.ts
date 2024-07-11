import { Router } from 'express';
import { startOfHour, parseISO} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();

//const appointments: Appointment[] = [];
const appointmentsRepository = new AppointmentsRepository();


//POST http://localhost:3333/appointments

// Add lib uuidv4 -> yarn add uuidv4
// Add lib date-fns -> yarn add date-fns

appointmentsRouter.post('/', (request, response) => {

    const {provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if (findAppointmentInSameDate){
        return response.status(400).json({ message: 'This appointment is already booked.'});
    }

   /* const appointment = {
        id: uuid_v4(),
        provider,
        date: parsedDate,
    };
    */

    const appointment = appointmentsRepository.create({
         provider,
         date: parsedDate,
        });

    //return response.json({ message: 'Post Appointments'})
    return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

export default appointmentsRouter;

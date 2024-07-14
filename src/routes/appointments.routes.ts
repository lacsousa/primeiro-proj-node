import { Router } from 'express';
import { parseISO} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from "../service/CreateAppointmentService";


const appointmentsRouter = Router();

//const appointments: Appointment[] = [];
const appointmentsRepository = new AppointmentsRepository();


//POST http://localhost:3333/appointments

// Add lib uuidv4 -> yarn add uuidv4
// Add lib date-fns -> yarn add date-fns

appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService =
            new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointmentService
                .execute({ date: parsedDate, provider});

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message});
    };
});


appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

export default appointmentsRouter;

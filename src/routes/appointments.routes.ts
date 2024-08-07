import { Router } from 'express';
import { parseISO} from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from "../service/CreateAppointmentService";
import AppointmentsRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();


//POST http://localhost:3333/appointments

// Add lib uuidv4 -> yarn add uuidv4
// Add lib date-fns -> yarn add date-fns

appointmentsRouter.get('/', async (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {

    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService
                .execute({ date: parsedDate, provider});

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message});
    };
});




export default appointmentsRouter;

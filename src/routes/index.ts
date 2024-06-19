import { Router } from "express";
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.post('/users', (request, response) => {
    const { name, email} = request.body;

    const user = {
        name,
        email
    };

    return response.json(user);
});

export default routes;
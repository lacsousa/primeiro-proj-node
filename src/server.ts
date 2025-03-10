import 'reflect-metadata';
// reflect metadata is a library that allows us to add metadata to our classes, properties, methods, etc.


import express, {Request, Response, NextFunction } from 'express';
// right after the import express
import 'express-async-errors';
import cors from 'cors';


import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';
/*
    Some initial installations

        yarn init -y
        yarn add express
        yarn typescript -D
        yarn tsc --init

        * adjust the tsconfig.json

        yarn tsc
        yarn add @types/express -D

        yarn add eslint -D (
            -- After this we need setting the eslint configuration
            -> yarn eslint --init
        )

        yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

        yarn add cors
        yarn add @types/cors -D
*/

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); //middleware
app.use(routes);

// After the creation this middleware it´s necessary to install the express-async-errors
// because the express doesn´t catch errors of kind async

// yarn add express-async-errors
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            });
        }

        console.log(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
});

app.get('/', (request, response) => {
    return response.json({ message: 'Hello world!'});
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!\n');
});

// yarn add ts-node-dev -D
// Plays the role of TSC and Nodemon

import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';
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
*/

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.json({ message: 'Hello world!'});
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!\n');
});

// yarn add ts-node-dev -D
// Plays the role of TSC and Nodemon

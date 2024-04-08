// Code to start the server and connect to the database

import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs, resolvers } from './graphql';
import { env } from './graphql/characters/config/dotenv';
import "./graphql/characters/config/database/connection";
import { initializeApp } from './graphql/characters/utils/initialize_values';
import { requestTimeLoggerMiddleware } from './middleware/logger';
import "./graphql/characters/utils/cron";


const app: Application = express();

export { app };

const buildApp = async () => {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [requestTimeLoggerMiddleware]
    });


    await apolloServer.start();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/graphql', expressMiddleware(apolloServer));
    app.listen(env.PORT, () => {
        console.log(`GraphQL ready at http://localhost:${env.PORT}/graphql`)
    });
    await initializeApp();
}

buildApp();

import "reflect-metadata";
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import {json} from "body-parser";
import { createConnection } from "typeorm";
import {buildSchema} from "type-graphql";
import {UserResolver} from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server-express";
import {PostResolver} from "./resolvers/PostResolver";
// import {UserResolver} from "./resolvers/UserResolver";

(async () => {
    const app = express();
    const port = process.env.PORT || 4000;

    app.use(cookieParser());
    app.use(cors());
    app.use(json());

    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver]
    });

    app.get('/', (_, res) => {
        res.send('Root route');
    });

    await createConnection();

    const server = new ApolloServer({
        schema
    });

    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`Server listening @ http://localhost:${port}`);
    })
})();
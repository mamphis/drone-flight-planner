import dotenv from 'dotenv';
dotenv.config();

import { Server } from "./server/server";

const server = new Server(parseInt(process.env.PORT || "3000"));

server.listen();
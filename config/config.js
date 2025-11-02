import {config as conf} from "dotenv";
conf();
const _config = {
    port: process.env.PORT,
    dbURl: process.env.MONGO_DB_URI,
    env: process.env.ENV
}

export const config = Object.freeze(_config);
import {config as conf} from "dotenv";
conf();
const _config = {
    port: process.env.PORT,
    dbURl: process.env.MONGO_DB_URI

}

export const config = Object.freeze(_config);
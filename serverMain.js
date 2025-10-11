import app from './src/main.js'
import { config } from './config/config.js';
import mongoose from "mongoose";

const port = config.port;

app.listen(port, () => {
        mongoose.connect(config.dbURl);
        mongoose.connection.on('connected', () => {
            console.log('db connected')
        });
    console.log(`server is running on ${port} now`);
})
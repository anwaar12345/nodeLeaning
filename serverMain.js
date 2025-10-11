import app from './src/main.js'
import { config } from './config/config.js';
const port = config.port;

app.listen(port, () => {
    console.log(`server is running on ${port} now`);
})
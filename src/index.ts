import express from 'express';
import { json } from 'body-parser';
import routes from './routes';
import RunSeeder from './database/seed/RunSeeder';
import config from './config/config';

const app = express();

app.use(json());
app.use('/' + config.prefix, routes);

// Log the loaded config for debugging
console.log('Config:', config);

RunSeeder();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

import express, { Express } from 'express';
import router from './routes';

const app: Express = express();
const port = process.env.APP_PORT as unknown as number;

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running @ http://localhost:${port}`);
});

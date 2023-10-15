import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes/schedulingRoutes';
import { Database } from './src/models/index';
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

const port = process.env.PORT || 8080;

const database = new Database();

database.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database successfull !!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
app.listen(port, () => {
  console.log(`Server is listening ${port} 🚀🚀🚀🚀🚀🚀🚀🚀`);
});

export default app;
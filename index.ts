import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes/schedulingRoutes';
import { Database } from './src/models/index';
import * as dotenv from 'dotenv';
dotenv.config();

// Create a new express application instance
const app: express.Application = express();

// The port the express app will listen on
const port = process.env.PORT || 8080;

// Initialize the database
const database = new Database();

// Test the database connection
database.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database successfull !!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Configure the app to use bodyParser, which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add the scheduling routes to the app
app.use('/', router);

// Serve the application at the given port
app.listen(port, () => {
  console.log(`Server is listening ${port} 🚀🚀🚀🚀🚀🚀🚀🚀`);
});

export default app;
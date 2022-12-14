import express from 'express';
import bodyParser from 'body-parser';
import schedulingRoutes from './src/routes/schedulingRoutes.ts';

const app = express();
const port = process.env.PORT || 8080;

// Use body-parser to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the schedulingRoutes for handling requests
app.use('/api', schedulingRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening ${port} 🚀🚀🚀🚀🚀🚀🚀🚀`);
});
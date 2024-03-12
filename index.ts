import express from "express";
import router from './src/routes/index';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(express.json());
router(app)
const swaggerDocument = require('./src/docs/swagger.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT: number | string = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`)
});



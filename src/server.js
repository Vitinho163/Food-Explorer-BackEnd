require('express-async-errors');

const cors = require('cors');
const express = require("express");
const routes = require("./routes");
const cookieParser = require('cookie-parser');
const database = require('./database');
const AppError = require('./utils/AppError');
const uploadConfig = require('./config/upload');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./documentation/swagger.json');

const app = express();

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(routes);

database();

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
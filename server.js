require("dotenv").config();
const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const app           = express();
const swaggerUi     = require('swagger-ui-express')
const swaggerFile   = require('./swagger_output.json')
const mongoose =require('mongoose')
const router = require('./routes');
const {PORT,MONGO_URI} = process.env;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/api", router.api);

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running`);
});
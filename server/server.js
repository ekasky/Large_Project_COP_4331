require('dotenv').config();
const express = require('express');

const app     = express();
const port    = process.env.PORT;

app.use(express.json());                    // Parse incoming requests as json

app.listen(port, () => {

    console.log(`Server listening on port ${port}`);

});
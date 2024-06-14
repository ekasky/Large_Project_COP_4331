require('dotenv').config();
const express    = require('express');
const authRoutes = require('./routes/api/authRoutes');

const app     = express();
const port    = process.env.PORT;

app.use(express.json());                                // Parse incoming requests as json
app.use('/api/auth', authRoutes);                       // Mount authRoutes at /api/auth endpoint

app.listen(port, () => {

    console.log(`Server listening on port ${port}`);

});
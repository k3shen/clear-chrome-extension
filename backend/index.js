const express = require('express');

require('dotenv').config();
require('./config/db');

const routes = require('./routes/user.routes');
const app = express();

app.use(express.json());
app.use(require('cors')());
app.use('/api/users', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});
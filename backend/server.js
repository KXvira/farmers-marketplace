const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./v1.routes/index');
const connectDB = require('./v1.utils/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.json({message: "Hi"});
})

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});

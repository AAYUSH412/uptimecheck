import express from 'express';
import websiteroutes from './routes/apiRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { prismaclient } from "db/client"

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/', websiteroutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
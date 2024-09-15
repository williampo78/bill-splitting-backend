import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import billRoutes from './routes/bill'
import groupRoutes from './routes/group'
import userRoutes from './routes/user'

const router = express.Router();
const app = express();
const port = process.env.PORT;

// Define CORS options
const corsOptions = {
    origin: '*', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow cookies to be sent
};

// Use the cors middleware with options
app.use(cors(corsOptions));

//middleware

app.use(express.json());
// app.use((req, res, next) => {
//     next();
// });


app.use('/api/bills', billRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/users', userRoutes);

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('MondoDB connected...');

        app.listen(port, () => {
            console.log(`server is listening on ${port} !!!`);
        });
    })
    .catch((err) => console.error(err));


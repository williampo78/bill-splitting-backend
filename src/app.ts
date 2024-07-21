import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import billRoutes from './routes';

const app = express();
const port = process.env.PORT;

//middleware

app.use(express.json());
app.use((req, res, next) => {
    console.log(123465);
    next();
});

app.use('/api/bills', billRoutes);

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('MondoDB connected...');

        app.listen(port, () => {
            console.log(`server is listening on ${port} !!!`);
        });
    })
    .catch((err) => console.error(err));

